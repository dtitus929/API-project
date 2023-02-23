const express = require('express');

const { requireAuth } = require('../../utils/auth');

const { Spot, Booking, Review, SpotImage, ReviewImage, User, sequelize } = require('../../db/models');

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
        .isDecimal()
        .withMessage('Latitude is not valid'),
    check('lng')
        .notEmpty()
        .exists({ checkFalsy: true })
        .isDecimal()
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
    // console.log(spots);
    res.json(spots)
})

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&


// Get all Spots
// GET => /api/spots
router.get('/', async (req, res, next) => {

    let query = {
        where: {},
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

    res.json(newSpot)
})

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

// Add an Image to a Spot based on the Spot's id
// POST => /api/spots/:spotId/images
router.post('/:spotId/images', requireAuth, async (req, res, next) => {

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

    console.log(newSpotImage.id);
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
    console.log(theSpot);

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
        }]
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
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {

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
        // console.log(bookedStart, " | ", bookedEnd);
        // console.log(requestedStart, " | ", requestedEnd);
        if ((requestedStart >= bookedStart) && (requestedStart <= bookedEnd)) {
            // console.log('Problem Start');
            isConflict = true;
            err.errors["startDate"] = "Start date conflicts with an existing booking";
        }
        if ((requestedEnd >= bookedStart) && (requestedEnd <= bookedEnd)) {
            // console.log('Problem End');
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
