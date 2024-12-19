const express = require("express");
const auth = require("../../middlewares/auth");
const {
  profileController,
  userController,
  clubController,
  notifController,
  configController,
  fcmController,
} = require("../../controllers");
const validate = require("../../middlewares/validate");
// const { getClub } = require("../../controllers/club.controller");

const router = express.Router();

router.route("/").post([fcmController.postFcm]);

module.exports = router;
