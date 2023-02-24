const express = require('express');

const { requireAuth } = require('../../utils/auth');

const { Review, User, Spot, ReviewImage, SpotImage } = require('../../db/models');

// Validation ===================
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateEditReview = [
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

const validateAddReviewImage = [
    check('url')
        .notEmpty()
        .exists({ checkFalsy: true })
        .withMessage('Image url is required'),
    handleValidationErrors
];

const router = express.Router();

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

// Get all Reviews of the Current User
// GET => /api/reviews/current
router.get('/current', requireAuth, async (req, res, next) => {

    const reviewsIn = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
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
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })

    // Get previewImage
    const Reviews = [];

    for (let i = 0; i < reviewsIn.length; i++) {
        const review = reviewsIn[i];
        Reviews.push(review.toJSON())
    }

    for (let i = 0; i < Reviews.length; i++) {
        const review = Reviews[i];

        if (review.Spot.SpotImages.length > 0) {
            for (let j = 0; j < review.Spot.SpotImages.length; j++) {
                const image = review.Spot.SpotImages[j];
                if (image.preview === true) {
                    review.previewImage = image.url
                }
            }
            if (!review.previewImage) {
                review.previewImage = "No preview image for this spot"
            }
        } else {
            review.previewImage = "No preview image for this spot"
        }
        delete review.Spot.SpotImages
    }


    res.json({ Reviews })
})

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

// Add an Image to a Review based on the Review's id
// POST => /api/reviews/:reviewId/images
router.post('/:reviewId/images', requireAuth, validateAddReviewImage, async (req, res, next) => {

    const { url } = req.body

    const theReview = await Review.findByPk(req.params.reviewId, {
        include: [
            {
                model: ReviewImage
            }
        ]
    })

    if (!theReview) {
        const err = new Error("Review couldn't be found");
        err.status = 404;
        return next(err);
    }

    if (theReview.userId !== req.user.id) {
        const err = new Error("Forbidden");
        err.status = 403;
        return next(err);
    }

    if (theReview.ReviewImages.length >= 10) {
        const err = new Error("Maximum number of images for this resource was reached");
        err.status = 403;
        return next(err);
    }

    const newReviewImage = await ReviewImage.create({
        reviewId: req.params.reviewId,
        url
    })

    const responseData = await ReviewImage.findByPk(newReviewImage.id, {
        attributes: ['id', 'url']
    })

    res.json(responseData)
})

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

// Edit a Review
// PUT => /api/reviews/:reviewId
router.put('/:reviewId', requireAuth, validateEditReview, async (req, res, next) => {

    const { review, stars } = req.body

    const theReview = await Review.findByPk(req.params.reviewId)

    if (!theReview) {
        const err = new Error("Review couldn't be found");
        err.status = 404;
        return next(err);
    }

    if (theReview.userId !== req.user.id) {
        const err = new Error("Forbidden");
        err.status = 403;
        return next(err);
    }

    theReview.set({
        review,
        stars
    })

    await theReview.save()

    res.json(theReview)
})

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

// Delete a Review
// DELETE => /api/reviews/:reviewId
router.delete('/:reviewId', requireAuth, async (req, res, next) => {

    const theReview = await Review.findByPk(req.params.reviewId)

    if (!theReview) {
        const err = new Error("Review couldn't be found");
        err.status = 404;
        return next(err);
    }

    if (theReview.userId !== req.user.id) {
        const err = new Error("Forbidden");
        err.status = 403;
        return next(err);
    }

    await theReview.destroy()

    res.json({ message: 'Successfully deleted', statusCode: 200 })
})

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

module.exports = router;
