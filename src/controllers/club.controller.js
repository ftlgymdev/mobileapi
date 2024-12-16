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

const getClubs = catchAsync(async (req, res) => {
  // console.log("Authenticated User:", req.user.id);
  new ApiSuccess(
    res,
    { dery: "dery" },
    "Club fetched successfully",
    httpStatus.OK
  );
  //   return res.json({ dery: "dery" });
});

const getClub = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await clubService.queryClubs(filter, options);
  new ApiSuccess(res, result, "Users retrieved successfully");
});

module.exports = {
  getClub,
};
