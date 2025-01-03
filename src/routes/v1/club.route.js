const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { clubController } = require('../../controllers');
const { clubValidation } = require('../../validations');

const router = express.Router();

router
  .route('/')
  .get(
    auth('getClubs'),
    validate(clubValidation.getClubs),
    clubController.getClubs
  );

router
  .route("/:clubId")
  .get(
    auth("getClub"),
    validate(clubValidation.getClub),
    clubController.getClub
  )

module.exports = router;
