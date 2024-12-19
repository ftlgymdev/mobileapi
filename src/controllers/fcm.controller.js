const catchAsync = require("../utils/catchAsync");
const {
  authService,
  userService,
  tokenService,
  emailService,
  clubService,
} = require("../services");
const exclude = require("../utils/exclude");
const ApiSuccess = require("../utils/ApiSuccess");
const httpStatus = require("http-status");
const pick = require("../utils/pick");
const prisma = require("../client");

var admin = require("firebase-admin");

var serviceAccount = require("./../serviceAccounKey.json");
const { not } = require("joi");
const { notification } = require("../client");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const postFcm = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);

  const { token, title, body } = req.body;

  if (!token || !title || !body) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  //  await userService.createUserNotif(title, message);

  const response = await prisma.notification.create({
    data: {
      title: title,
      message: body,
    },
  });

  const message = {
    notification: {
      title: title,
      body: body,
    },
    token: token,
  };

  const responses = await admin.messaging().send(message);

  const result = {
    dery: "dery",
  };
  new ApiSuccess(res, response, "Users retrieved successfully");
});

module.exports = {
  postFcm,
};
