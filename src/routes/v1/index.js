const express = require("express");
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const testRoute = require("./test.route");
const config = require("../../config/config");
const profileRoute = require("./profile.route");
const clubRoute = require("./club.route");

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
