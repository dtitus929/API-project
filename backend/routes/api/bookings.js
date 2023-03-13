const express = require('express');

const { requireAuth } = require('../../utils/auth');

const { Booking, Spot, SpotImage } = require('../../db/models');

const router = express.Router();

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

// Get all of the Current User's Bookings
// GET => /api/bookings/current
router.get('/current', requireAuth, async (req, res, next) => {

    const bookingsIn = await Booking.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: Spot,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'description']
                },
                include: [
                    {
                        model: SpotImage
                    }
                ]
            }
        ]
    })

    // Get previewImage
    const Bookings = [];

    for (let i = 0; i < bookingsIn.length; i++) {
        const booking = bookingsIn[i];
        Bookings.push(booking.toJSON())
    }


    for (let i = 0; i < Bookings.length; i++) {
        const booking = Bookings[i];

        if (booking.Spot.SpotImages.length > 0) {
            for (let j = 0; j < booking.Spot.SpotImages.length; j++) {
                const image = booking.Spot.SpotImages[j];
                if (image.preview === true) {
                    booking.Spot.previewImage = image.url
                }
            }
            if (!booking.Spot.previewImage) {
                booking.Spot.previewImage = "No preview image for this spot"
            }
        } else {
            booking.Spot.previewImage = "No preview image for this spot"
        }
        delete booking.Spot.SpotImages
    }


    res.json({ Bookings })
})

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

// Edit a Booking
// PUT => /api/bookings/:bookingId
router.put('/:bookingId', requireAuth, async (req, res, next) => {

    const thisBooking = await Booking.findByPk(req.params.bookingId)

    const { startDate, endDate } = req.body

    if (!thisBooking) {
        const err = new Error("Booking couldn't be found");
        err.status = 404;
        return next(err);
    }

    if (thisBooking.userId !== req.user.id) {
        const err = new Error("Forbidden");
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

    const today = new Date()
    // console.log(today, requestedEnd);
    if (today >= requestedEnd) {
        const err = new Error("Past bookings can't be modified");
        err.status = 403;
        return next(err);
    }

    // Checking if Dates are available
    const bookedDates = await Booking.findAll({
        where: {
            spotId: thisBooking.spotId
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

    thisBooking.set({
        startDate,
        endDate
    })

    res.json(thisBooking)
})

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

// Delete a Booking
// DELETE => /api/bookings/:bookingId
router.delete('/:bookingId', requireAuth, async (req, res, next) => {

    const thisBooking = await Booking.findByPk(req.params.bookingId)

    if (!thisBooking) {
        const err = new Error("Booking couldn't be found");
        err.status = 404;
        return next(err);
    }

    if (thisBooking.userId !== req.user.id) {
        const err = new Error("Forbidden");
        err.status = 403;
        return next(err);
    }

    const bookingStart = new Date(thisBooking.startDate)
    const today = new Date()
    if (today >= bookingStart) {
        const err = new Error("Bookings that have been started can't be deleted");
        err.status = 403;
        return next(err);
    }

    await thisBooking.destroy()

    res.json({ message: 'Successfully deleted', statusCode: 200 })
})

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

module.exports = router;
