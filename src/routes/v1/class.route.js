const express = require("express");
const auth = require("../../middlewares/auth");
const { classController } = require("../../controllers");
const validate = require("../../middlewares/validate");
// const { getClub } = require("../../controllers/club.controller");

const router = express.Router();

router.route("/").get(auth("getClass"), [classController.getGxClass]);
router.route("/pilates").get(auth("getClass"), [classController.getPilates]);

module.exports = router;
