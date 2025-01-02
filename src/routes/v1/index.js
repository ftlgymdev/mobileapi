const express = require("express");
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const testRoute = require("./test.route");
const config = require("../../config/config");
const profileRoute = require("./profile.route");
const clubRoute = require("./club.route");
const notifRoute = require("./notif.route");
const configRoute = require("./config.route");
const fcmRoute = require("./fcm.route");
const checkinRoute = require("./checkin.route");
const scheduleRoute = require("./schedule.route");

const router = express.Router();

const defaultRoutes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: userRoute,
  },
  {
    path: "/profile",
    route: profileRoute,
  },
  {
    path: "/clubs",
    route: clubRoute,
  },
  {
    path: "/notifications",
    route: notifRoute,
  },
  {
    path: "/config",
    route: configRoute,
  },
  {
    path: "/fcm",
    route: fcmRoute,
  },
  {
    path: "/checkin",
    route: checkinRoute,
  },
  {
    path: "/class-schedules",
    route: scheduleRoute,
  }
];

// routes available only in development mode
const devRoutes = [
  {
    path: "/test",
    route: testRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === "development") {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
