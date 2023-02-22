const express = require('express');

const { requireAuth } = require('../../utils/auth');

const { Spot, Booking, Review, SpotImage, ReviewImage, User } = require('../../db/models');

// Validation ===================
// const { check } = require('express-validator');
// const { handleValidationErrors } = require('../../utils/validation');
// const validateSignup = [
//     check('firstName')
//         .notEmpty()
//         .exists({ checkFalsy: true })
//         .withMessage('First Name is required'),
//     handleValidationErrors
// ];

const router = express.Router();

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

// Get all Spots
// GET => /api/spots
router.get('/', async (req, res, next) => {

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

// ======================

// Get all Spots owned by the Current User
// GET => /api/spots/current
router.get('/current', requireAuth, async (req, res, next) => {
    res.json({ SpotUserId: req.user.id })
})

// ======================

// Get details of a Spot from an id
// GET => /api/spots/:spotId
router.get('/:spotId', async (req, res, next) => {
    res.json({ spotId: req.params.spotId })
})

// ======================

// Create a Spot
// POST => /api/spots
router.post('/', requireAuth, async (req, res, next) => {
    res.json('post create spot')
})

// ======================

// Add an Image to a Spot based on the Spot's id
// POST => /api/spots/:spotId/images
router.post('/:spotId/images', requireAuth, async (req, res, next) => {

    // if (??????) {
    //     const err = new Error("Forbidden");
    //     err.status = 403;
    //     return next(err);
    // }

    res.json('post spot image')
})

// ======================

// Edit a Spot
// PUT => /api/spots/:spotId
router.put('/:spotId', requireAuth, async (req, res, next) => {

    // if (??????) {
    //     const err = new Error("Forbidden");
    //     err.status = 403;
    //     return next(err);
    // }

    res.json('put (edit) spot')
})

// ======================

// Delete a Spot
// DELETE => /api/spots/:spotId
router.delete('/:spotId', requireAuth, async (req, res, next) => {

    // if (??????) {
    //     const err = new Error("Forbidden");
    //     err.status = 403;
    //     return next(err);
    // }

    res.json('delete spot')
})

// ======================

// Get all Reviews by a Spot's id	get
// GET => /api/spots/:spotId/reviews
router.get('/:spotId/reviews', async (req, res, next) => {


    res.json('get spot reviews')
})

// ======================

// 	Create a Review for a Spot based on the Spot's id
// POST => /api/spots/:spotId/reviews
router.post('/:spotId/reviews', requireAuth, async (req, res, next) => {


    res.json('create spot review')
})

// ======================

// 	Get all Bookings for a Spot based on the Spot's id
// GET => /api/spots/:spotId/bookings
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {


    res.json('get spot bookings')
})

// ======================

// 	Create a Booking from a Spot based on the Spot's id
// POST => /api/spots/:spotId/bookings
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {

    // if (??????) {
    //     const err = new Error("Forbidden");
    //     err.status = 403;
    //     return next(err);
    // }

    res.json('create booking')
})

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

module.exports = router;
