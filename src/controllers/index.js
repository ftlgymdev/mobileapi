const authController = require("./auth.controller");
const userController = require("./user.controller");
const testController = require("./test.controller");
const profileController = require("./profile.controller");
const clubController = require("./club.controller");
const notifController = require("./notif.controller");
const configController = require("./config.controller");
const fcmController = require("./fcm.controller");
const checkinController = require("./checkin.controller");
const scheduleController = require("./schedule.controller");

module.exports = {
  authController,
  userController,
  testController,
  profileController,
  clubController,
  notifController,
  configController,
  fcmController,
  checkinController,
  scheduleController,
};
