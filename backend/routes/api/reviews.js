const express = require('express');

const { requireAuth } = require('../../utils/auth');

const { Review } = require('../../db/models');

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

// Get all Reviews of the Current User
// GET => /api/reviews/current
router.get('/current', requireAuth, async (req, res, next) => {
    res.json({ ReviewUserId: req.user.id })
})

// ======================

// Add an Image to a Review based on the Review's id
// POST => /api/reviews/:reviewId/images
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {

    // if (??????) {
    //     const err = new Error("Forbidden");
    //     err.status = 403;
    //     return next(err);
    // }

    res.json('add image to review')
})

// ======================

// Edit a Review
// PUT => /api/reviews/:reviewId
router.put('/:reviewId', requireAuth, async (req, res, next) => {

    // if (??????) {
    //     const err = new Error("Forbidden");
    //     err.status = 403;
    //     return next(err);
    // }

    res.json('put (edit) review')
})

// ======================

// Delete a Review
// DELETE => /api/reviews/:reviewId
router.delete('/:reviewId', requireAuth, async (req, res, next) => {

    // if (??????) {
    //     const err = new Error("Forbidden");
    //     err.status = 403;
    //     return next(err);
    // }

    res.json('delete review')
})


// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

module.exports = router;
