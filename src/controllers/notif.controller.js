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

const prisma = new PrismaClient();

const getNotifs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["title"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const page = Number(options.page) ?? 1;
  const limit = Number(options.limit) ?? 10;
  const sortBy = options.sortBy ?? "createdAt";
  const sortType = options.sortType ?? "desc";

  // Generate Prisma where condition
  const where = {};

  if (filter.title) {
    where.title = { contains: filter.title }; // Case-insensitive search
  }

  const result = await prisma.notification.findMany({
    where: where, // Use generated where condition
    skip: (page - 1) * limit,
    take: limit,
    orderBy: sortBy ? { [sortBy]: sortType } : undefined,
  });
  new ApiSuccess(res, result, "Users retrieved successfully");
});

const getClub = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await clubService.queryClubs(filter, options);
  new ApiSuccess(res, result, "Users retrieved successfully");
});

module.exports = {
  getClub,
  getNotifs,
};
