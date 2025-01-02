const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { scheduleController } = require('../../controllers');
const { scheduleValidation } = require('../../validations');

const router = express.Router();

router
    .route('/date-filter')
    .get(
        auth('getSchedules'),
        scheduleController.getDateFilter
    );

router
    .route('/')
    .get(
        auth('getSchedules'),
        validate(scheduleValidation.getSchedules),
        scheduleController.getSchedules
    );

router
    .route("/:scheduleId")
    .get(
        auth("getSchedule"),
        validate(scheduleValidation.getSchedule),
        scheduleController.getSchedule
    )


module.exports = router;
