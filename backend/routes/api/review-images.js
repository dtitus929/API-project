const express = require('express');

const { requireAuth } = require('../../utils/auth');

const { ReviewImage, Review } = require('../../db/models');

const router = express.Router();

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

// Delete a Review Image
// DELETE => /api/review-images/:imageId
router.delete('/:imageId', requireAuth, async (req, res, next) => {

    const thisReviewImage = await ReviewImage.findByPk(req.params.imageId, {
        include: [
            {
                model: Review,
                attributes: ['userId']
            }
        ]
    })

    if (!thisReviewImage) {
        const err = new Error("Review Image couldn't be found");
        err.status = 404;
        return next(err);
    }


    if (thisReviewImage.Review.userId !== req.user.id) {
        const err = new Error("Forbidden");
        err.status = 403;
        return next(err);
    }

    await thisReviewImage.destroy()

    res.json({ message: 'Successfully deleted', statusCode: 200 })
})

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

module.exports = router;
