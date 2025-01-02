const express = require('express');
const auth = require('../../middlewares/auth');
const { checkinController } = require('../../controllers');

const router = express.Router();

router
    .route('/')
    .post(
        auth('checkin'),
        [checkinController.checkin]
    );

module.exports = router;
