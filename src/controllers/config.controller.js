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
const { Prisma, PrismaClient } = require("@prisma/client");
const ApiError = require("../utils/ApiError");

const prisma = new PrismaClient();

const getVersi = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["version"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? "desc";

  // Generate Prisma where condition
  const where = {};
  if (filter.version) {
    where.version = { contains: filter.version }; // Case-insensitive search
  }

  const result = await prisma.appConfig.findMany({
    where, // Use generated where condition
    skip: (page - 1) * limit,
    take: limit,
    orderBy: sortBy ? { [sortBy]: sortType } : undefined,
  });
  new ApiSuccess(res, result, "Users retrieved successfully");
});

const createConfig = catchAsync(async (req, res) => {
  const { platform, version, downloadUrl, message } = req.body;
  //   const user = await userService.createUser(email, password, name, role);
  const response = await prisma.appConfig.create({
    data: {
      platform,
      version,
      downloadUrl,
      message,
    },
  });
  new ApiSuccess(
    res,
    response,
    "User created successfully",
    httpStatus.CREATED
  );
});

module.exports = {
  getVersi,
  createConfig,
};
