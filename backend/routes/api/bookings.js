const express = require('express');

const { requireAuth } = require('../../utils/auth');

const { Booking } = require('../../db/models');

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


// Get all of the Current User's Bookings
// GET => /api/bookings/current
router.get('/current', requireAuth, async (req, res, next) => {
    res.json({ BookingsUserId: req.user.id })
})

// ======================

// Edit a Booking
// PUT => /api/bookings/:bookingId
router.put('/:bookingId', requireAuth, async (req, res, next) => {

    // if (??????) {
    //     const err = new Error("Forbidden");
    //     err.status = 403;
    //     return next(err);
    // }

    res.json('put (edit) booking')
})

// ======================

// Delete a Booking
// DELETE => /api/bookings/:bookingId
router.delete('/:bookingId', requireAuth, async (req, res, next) => {

    // if (??????) {
    //     const err = new Error("Forbidden");
    //     err.status = 403;
    //     return next(err);
    // }

    res.json('delete booking')
})

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

module.exports = router;
