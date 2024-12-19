const express = require("express");
const auth = require("../../middlewares/auth");
const {
  profileController,
  userController,
  clubController,
  notifController,
  configController,
} = require("../../controllers");
const validate = require("../../middlewares/validate");
// const { getClub } = require("../../controllers/club.controller");

const router = express.Router();

router
  .route("/")
  .get([configController.getVersi])
  .post([configController.createConfig]);

module.exports = router;
