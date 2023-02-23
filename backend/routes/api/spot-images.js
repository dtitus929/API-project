const express = require('express');

const { requireAuth } = require('../../utils/auth');

const { SpotImage, Spot } = require('../../db/models');

const router = express.Router();

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

// Delete a Spot Image
// DELETE => /api/spot-images/:imageId
router.delete('/:imageId', requireAuth, async (req, res, next) => {

    const thisSpotImage = await SpotImage.findByPk(req.params.imageId, {
        include: [
            {
                model: Spot,
                attributes: ['ownerId']
            }
        ]
    })

    if (!thisSpotImage) {
        const err = new Error("Spot Image couldn't be found");
        err.status = 404;
        return next(err);
    }

    if (thisSpotImage.Spot.ownerId !== req.user.id) {
        const err = new Error("Forbidden");
        err.status = 403;
        return next(err);
    }

    await thisSpotImage.destroy()

    res.json({ message: 'Successfully deleted', statusCode: 200 })
})

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

module.exports = router;
