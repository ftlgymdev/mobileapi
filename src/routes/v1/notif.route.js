const express = require("express");
const auth = require("../../middlewares/auth");
const {
  profileController,
  userController,
  clubController,
  notifController,
} = require("../../controllers");
const validate = require("../../middlewares/validate");
// const { getClub } = require("../../controllers/club.controller");

const router = express.Router();

router.route("/").get(auth("getNotif"), [notifController.getNotifs]);
//   .post(
//     auth("creteNotif"),
//     validate(userValidation.createUserNotif),
//     userController.createUserNotif
//   );

module.exports = router;
