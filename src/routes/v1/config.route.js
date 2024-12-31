const express = require("express");
const auth = require("../../middlewares/auth");
const { configController } = require("../../controllers");
const validate = require("../../middlewares/validate");

const router = express.Router();

router
  .route("/")
  .get([configController.getConfig]);

module.exports = router;
