const express = require('express');

const { requireAuth } = require('../../utils/auth');

const { Spot, Booking, Review, SpotImage, ReviewImage, User, sequelize } = require('../../db/models');
const { Op } = require('sequelize');

// Validation ===================
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateCreateSpot = [
    check('address')
        .notEmpty()
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .notEmpty()
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .notEmpty()
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .notEmpty()
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .notEmpty()
        .exists({ checkFalsy: true })
        .withMessage('Latitude is not valid'),
    check('lat')
        .custom((value) => {
            if (value < -90 || value > 90) {
                throw new Error();
            }
            return true;
        })
        .withMessage('Latitude is not valid'),
    check('lng')
        .notEmpty()
        .exists({ checkFalsy: true })
        .withMessage('Longitude is not valid'),
    check('lng')
        .custom((value) => {
            if (value < -180 || value > 180) {
                throw new Error();
            }
            return true;
        })
        .withMessage('Longitude is not valid'),
    check('name')
        .notEmpty()
        .exists({ checkFalsy: true })
        .withMessage('Name is required'),
    check('name')
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .notEmpty()
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .notEmpty()
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required'),
    handleValidationErrors
];

const validateCreateReview = [
    check('review')
        .notEmpty()
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .notEmpty()
        .isInt({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];

const validateCreateBooking = [
    check('startDate')
        .notEmpty()
        .exists({ checkFalsy: true })
        .withMessage('Start date is required'),
    check('endDate')
        .notEmpty()
        .exists({ checkFalsy: true })
        .withMessage('End date is required'),
    handleValidationErrors
];

const validateFiltersPage = [
    check('page')
        .custom((value) => {
            if (value && value <= 0) {
                throw new Error();
            }
            return true;
        })
        .withMessage('Page must be greater than or equal to 1'),
    check('size')
        .custom((value) => {
            if (value && value <= 0) {
                throw new Error();
            }
            return true;
        })
        .withMessage('Size must be greater than or equal to 1'),
    // ----------------
    check('minLat')
        .custom((value) => {
            if (value && (value < -90 || value > 90)) {
                throw new Error();
            }
            return true;
        })
        .withMessage('Minimum latitude is invalid'),
    check('maxLat')
        .custom((value) => {
            if (value && (value < -90 || value > 90)) {
                throw new Error();
            }
            return true;
        })
        .withMessage('Maximum latitude is invalid'),
    // ----------------
    check('minLng')
        .custom((value) => {
            if (value && (value < -180 || value > 180)) {
                throw new Error();
            }
            return true;
        })
        .withMessage('Minimum longitude is invalid'),
    check('maxLng')
        .custom((value) => {
            if (value && (value < -180 || value > 180)) {
                throw new Error();
            }
            return true;
        })
        .withMessage('Maximum longitude is invalid'),
    // ----------------
    check('minPrice')
        .custom((value) => {
            if (value && value < 0) {
                throw new Error();
            }
            return true;
        })
        .withMessage('Minimum price must be greater than or equal to 0'),
    check('maxPrice')
        .custom((value) => {
            if (value && value < 0) {
                throw new Error();
            }
            return true;
        })
        .withMessage('Maximum price must be greater than or equal to 0'),
    handleValidationErrors
];

const validateAddSpotImage = [
    check('url')
        .notEmpty()
        .exists({ checkFalsy: true })
        .withMessage('Image url is required'),
    check('preview')
        .notEmpty()
        .withMessage('Preview must be true or false'),
    check('preview')
        .custom((value) => {
            if (value && value !== true && value !== false) {
                throw new Error();
            }
            return true;
        })
        .withMessage('Preview must be true or false'),
    handleValidationErrors
];

const router = express.Router();

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

// Get all Spots TEST
// GET => /api/spots/all
router.get('/all', async (req, res, next) => {

    const spots = await Spot.findAll({
        include: [
            { model: SpotImage },
            { model: Review },
            { model: Booking },
            { model: User, as: "Owner" },
        ]
    })

    res.json(spots)
})

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

// Get all Spots
// GET => /api/spots
router.get('/', validateFiltersPage, async (req, res, next) => {

    let query = {
        where: {},
        include: []
    };

    query.include.push({
        model: SpotImage
    })

    ///// Filters/Pagination START /////

    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query;

    // Pagination ================

    if (page === undefined || page <= 0 || page > 10) {
        page = 1
    } else {
        page = parseInt(req.query.page)
    }
    if (size === undefined || size <= 0 || size > 20) {
        size = 20
    } else {
        size = parseInt(req.query.size)
    }

    if (page >= 1 && size >= 1) {
        query.limit = size;
        query.offset = size * (page - 1);
    }

    // Filters ================

    if (minLat && !maxLat) {
        query.where.lat = { [Op.gte]: minLat }
    }

    if (maxLat && !minLat) {
        query.where.lat = { [Op.lte]: maxLat }
    }

    if (maxLat && minLat) {
        query.where.lat = { [Op.between]: [minLat, maxLat] }
    }

    // ------

    if (minLng && !maxLng) {
        query.where.lng = { [Op.gte]: minLng }
    }

    if (maxLng && !minLng) {
        query.where.lng = { [Op.lte]: maxLng }
    }

    if (maxLng && minLng) {
        query.where.lng = { [Op.between]: [minLng, maxLng] }
    }

    // ------

    if (minPrice && !maxPrice) {
        query.where.price = { [Op.gte]: minPrice }
    }

    if (maxPrice && !minPrice) {
        query.where.price = { [Op.lte]: maxPrice }
    }

    if (maxPrice && minPrice) {
        query.where.price = { [Op.between]: [minPrice, maxPrice] }
    }

    ///// Filters/Pagination END /////

    const spotsIn = await Spot.findAll(query)

    const Spots = [];

    for (let i = 0; i < spotsIn.length; i++) {
        const spot = spotsIn[i];
        Spots.push(spot.toJSON())
    }

    for (let i = 0; i < Spots.length; i++) {
        const spot = Spots[i];

        // Find avgRating
        let reviewData = await Review.findOne({
            where: {
                spotId: spot.id
            },
            attributes: [
                [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
            ]
        })

        let reviewAvg = Number(parseFloat(reviewData.toJSON().avgRating).toFixed(1))
        if (reviewAvg) {
            spot.avgRating = reviewAvg
        } else {
            spot.avgRating = "No reviews yet"
        }

        // Get previewImage
        if (spot.SpotImages.length > 0) {
            for (let j = 0; j < spot.SpotImages.length; j++) {
                const image = spot.SpotImages[j];
                if (image.preview === true) {
                    spot.previewImage = image.url
                }
            }
            if (!spot.previewImage) {
                spot.previewImage = "No preview image for this spot"
            }
        } else {
            spot.previewImage = "No preview image for this spot"
        }
        delete spot.SpotImages
    }

    res.json({ Spots, "page": page, "size": size })
})

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

// Get all Spots owned by the Current User
// GET => /api/spots/current
router.get('/current', requireAuth, async (req, res, next) => {
    let query = {
        where: {
            ownerId: req.user.id
        },
        include: []
    };

    query.include.push({
        model: SpotImage
    })

    const spotsIn = await Spot.findAll(query)

    const Spots = [];

    for (let i = 0; i < spotsIn.length; i++) {
        const spot = spotsIn[i];
        Spots.push(spot.toJSON())
    }

    for (let i = 0; i < Spots.length; i++) {
        const spot = Spots[i];

        // Find avgRating
        let reviewData = await Review.findOne({
            where: {
                spotId: spot.id
            },
            attributes: [
                [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
            ]
        })

        let reviewAvg = Number(parseFloat(reviewData.toJSON().avgRating).toFixed(1))
        if (reviewAvg) {
            spot.avgRating = reviewAvg
        } else {
            spot.avgRating = "No reviews yet"
        }

        // Get previewImage
        if (spot.SpotImages.length > 0) {
            for (let j = 0; j < spot.SpotImages.length; j++) {
                const image = spot.SpotImages[j];
                if (image.preview === true) {
                    spot.previewImage = image.url
                }
            }
            if (!spot.previewImage) {
                spot.previewImage = "No preview image for this spot"
            }
        } else {
            spot.previewImage = "No preview image for this spot"
        }
        delete spot.SpotImages
    }

    res.json({ Spots })

})

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

// Get details of a Spot from an id
// GET => /api/spots/:spotId
router.get('/:spotId', async (req, res, next) => {

    let query = {
        where: {
            id: req.params.spotId
        },
        include: []
    };

    query.include.push(
        {
            model: SpotImage,
            attributes: ['id', 'url', 'preview']
        },
        {
            model: User, as: "Owner",
            attributes: ['id', 'firstName', 'lastName']
        }
    )

    const spotsIn = await Spot.findAll(query)

    if (spotsIn.length === 0) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    }

    const Spots = [];

    for (let i = 0; i < spotsIn.length; i++) {
        const spot = spotsIn[i];
        Spots.push(spot.toJSON())
    }

    for (let i = 0; i < Spots.length; i++) {
        const spot = Spots[i];

        // Find avgRating
        let reviewData = await Review.findOne({
            where: {
                spotId: spot.id
            },
            attributes: [
                [sequelize.fn('AVG', sequelize.col('stars')), 'avgRating']
            ]
        })

        let reviewAvg = Number(parseFloat(reviewData.toJSON().avgRating).toFixed(1))
        if (reviewAvg) {
            spot.avgStarRating = reviewAvg
        } else {
            spot.avgStarRating = "No reviews yet"
        }

        // Get Review Count
        const count = await Review.count({
            where: {
                spotId: req.params.spotId
            }
        });

        spot.numReviews = count;
        if (spot.SpotImages.length === 0) {
            spot.SpotImages = "No images for this spot"
        }

    }

    res.json(Spots[0])

})

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

// Create a Spot
// POST => /api/spots
router.post('/', requireAuth, validateCreateSpot, async (req, res, next) => {

    const { address, city, state, country, lat, lng, name, description, price } = req.body

    const newSpot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat: parseFloat(lat),
        lng: parseFloat(lng),
        name,
        description,
        price
    })

    res.status(201)
    res.json(newSpot)
})

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

// Add an Image to a Spot based on the Spot's id
// POST => /api/spots/:spotId/images
router.post('/:spotId/images', requireAuth, validateAddSpotImage, async (req, res, next) => {

    const { url, preview } = req.body

    const theSpot = await Spot.findByPk(req.params.spotId)

    if (!theSpot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    }

    if (theSpot.ownerId !== req.user.id) {
        const err = new Error("Forbidden");
        err.status = 403;
        return next(err);
    }

    const newSpotImage = await SpotImage.create({
        spotId: req.params.spotId,
        url,
        preview
    })

    const responseData = await SpotImage.findByPk(newSpotImage.id, {
        attributes: ['id', 'url', 'preview']
    })

    res.json(responseData)
})

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

// Edit a Spot
// PUT => /api/spots/:spotId
router.put('/:spotId', requireAuth, validateCreateSpot, async (req, res, next) => {

    const { address, city, state, country, lat, lng, name, description, price } = req.body

    const theSpot = await Spot.findByPk(req.params.spotId)

    if (!theSpot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    }

    if (theSpot.ownerId !== req.user.id) {
        const err = new Error("Forbidden");
        err.status = 403;
        return next(err);
    }

    theSpot.set({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })

    await theSpot.save()

    res.json(theSpot)
})

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

// Delete a Spot
// DELETE => /api/spots/:spotId
router.delete('/:spotId', requireAuth, async (req, res, next) => {

    const theSpot = await Spot.findByPk(req.params.spotId)

    if (!theSpot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    }

    if (theSpot.ownerId !== req.user.id) {
        const err = new Error("Forbidden");
        err.status = 403;
        return next(err);
    }

    await theSpot.destroy()

    res.json({ message: 'Successfully deleted', statusCode: 200 })
})

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

// Get all Reviews by a Spot's id	get
// GET => /api/spots/:spotId/reviews
router.get('/:spotId/reviews', async (req, res, next) => {

    const Reviews = await Review.findAll({
        where: {
            spotId: req.params.spotId
        },
        include: [{
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        },
        {
            model: ReviewImage,
            attributes: ['id', 'url']
        }],
        order: [['createdAt', 'DESC']]
    })

    if (Reviews.length === 0) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    }

    res.json({ Reviews })
})

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

// 	Create a Review for a Spot based on the Spot's id
// POST => /api/spots/:spotId/reviews
router.post('/:spotId/reviews', requireAuth, validateCreateReview, async (req, res, next) => {

    const { review, stars } = req.body

    const theSpot = await Spot.findByPk(req.params.spotId)

    if (!theSpot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    }

    // Check if user already reviewed this spot

    const prevReviews = await Review.findAll({
        where: {
            spotId: req.params.spotId,
            userId: req.user.id
        }
    })

    if (prevReviews.length > 0) {
        const err = new Error("User already has a review for this spot");
        err.status = 403;
        return next(err);
    }

    const newReview = await Review.create({
        spotId: req.params.spotId,
        userId: req.user.id,
        review,
        stars
    })

    res.status(201)
    res.json(newReview)
})

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

// 	Get all Bookings for a Spot based on the Spot's id
// GET => /api/spots/:spotId/bookings
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {

    const thisSpot = await Spot.findByPk(req.params.spotId)

    if (!thisSpot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    }

    let Bookings;

    if (thisSpot.ownerId === req.user.id) {
        Bookings = await Booking.findAll({
            where: {
                spotId: req.params.spotId
            },
            include: [{
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }]
        })
    } else {
        Bookings = await Booking.findAll({
            where: {
                spotId: req.params.spotId
            },
            attributes: ['spotId', 'startDate', 'endDate']
        })
    }

    res.json({ Bookings })
})

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

// 	Create a Booking from a Spot based on the Spot's id
// POST => /api/spots/:spotId/bookings
router.post('/:spotId/bookings', requireAuth, validateCreateBooking, async (req, res, next) => {

    const thisSpot = await Spot.findByPk(req.params.spotId)

    const { startDate, endDate } = req.body

    if (!thisSpot) {
        const err = new Error("Spot couldn't be found");
        err.status = 404;
        return next(err);
    }

    if (thisSpot.ownerId === req.user.id) {
        const err = new Error("Sorry, spots cannot be booked by the owner");
        err.status = 403;
        return next(err);
    }

    const requestedStart = new Date(startDate);
    const requestedEnd = new Date(endDate);

    if (requestedStart >= requestedEnd) {
        const err = new Error("Validation error");
        err.errors = { endDate: 'endDate cannot be on or before startDate' };
        err.status = 400;
        return next(err);
    }

    // Checking if Dates are available
    const bookedDates = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        },
        attributes: ['startDate', 'endDate']
    })

    const checkDates = [];

    for (let i = 0; i < bookedDates.length; i++) {
        dates = bookedDates[i];
        checkDates.push(dates.toJSON())
    }

    for (let i = 0; i < checkDates.length; i++) {
        let isConflict = false;
        const err = new Error("Sorry, this spot is already booked for the specified dates");
        err.status = 403;
        err.errors = {}
        const dateSet = checkDates[i];
        const bookedStart = new Date(dateSet.startDate);
        const bookedEnd = new Date(dateSet.endDate)
        if ((requestedStart >= bookedStart) && (requestedStart <= bookedEnd)) {
            isConflict = true;
            err.errors["startDate"] = "Start date conflicts with an existing booking";
        }
        if ((requestedEnd >= bookedStart) && (requestedEnd <= bookedEnd)) {
            isConflict = true;
            err.errors["endDate"] = 'End date conflicts with an existing booking';
        }
        if (isConflict) {
            return next(err);
        }
    }

    const newBooking = await Booking.create({
        spotId: Number(req.params.spotId),
        userId: req.user.id,
        startDate: startDate,
        endDate: endDate
    })


    res.json(newBooking)
})

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

module.exports = router;
