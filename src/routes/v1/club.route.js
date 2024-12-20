const express = require("express");
const auth = require("../../middlewares/auth");
const {
  profileController,
  userController,
  clubController,
} = require("../../controllers");
const validate = require("../../middlewares/validate");
// const { getClub } = require("../../controllers/club.controller");

const router = express.Router();

router.route("/").get(auth("getClubs"), [clubController.getClub]);

module.exports = router;