const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { testController } = require('../../controllers');

const router = express.Router();

router
  .route('/login-gymmasterapi')
  .post(testController.loginGymMasterApi);

module.exports = router;
