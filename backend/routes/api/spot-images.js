const express = require('express');

const { requireAuth } = require('../../utils/auth');

const { SpotImage } = require('../../db/models');

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

// Delete a Spot Image
// DELETE => /api/spot-images/:imageId
router.delete('/:imageId', requireAuth, async (req, res, next) => {

    // if (??????) {
    //     const err = new Error("Forbidden");
    //     err.status = 403;
    //     return next(err);
    // }

    res.json('delete spot image')
})


// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&

module.exports = router;
