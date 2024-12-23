const express = require("express");
const auth = require("../../middlewares/auth");
const { trainerController } = require("../../controllers");
const validate = require("../../middlewares/validate");
// const { getClub } = require("../../controllers/club.controller");

const router = express.Router();

router.route("/").get(auth("getTrainer"), [trainerController.getTrainer]);

module.exports = router;
