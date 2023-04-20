const express = require('express');
const router = express.Router();
const { Spot } = require('../../db/models');
const { User } = require('../../db/models');
const { Review } = require('../../db/models');
const { Booking } = require('../../db/models');
const { SpotImage } = require('../../db/models');
const { ReviewImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { json } = require('sequelize');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

router.get("/current", requireAuth, async (req, res) => {
    let bookings = await Booking.findAll({
            where:{
                userId: req.user.id
            },
            include: {
                model: Spot,
                attributes: [
                    "id", "ownerId", "address", "city", "state","country", "lat", "lng", "name", "price"
                ]
            }
        });

    // console.log(bookings)
    res.json({Bookings: bookings})
})

module.exports = router;