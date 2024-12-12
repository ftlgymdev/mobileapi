const express = require('express');
const auth = require('../../middlewares/auth');
const { profileController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .get(auth('getProfile'), [profileController.getProfile]);

module.exports = router;
