const catchAsync = require("../utils/catchAsync");
const { configService } = require("../services");
const exclude = require("../utils/exclude");
const ApiSuccess = require("../utils/ApiSuccess");
const httpStatus = require("http-status");
const pick = require("../utils/pick");
const { Prisma, PrismaClient } = require("@prisma/client");
const ApiError = require("../utils/ApiError");
const prisma = new PrismaClient();

const getConfig = catchAsync(async (req, res) => {
  const config = await configService.getConfigByPlatform(req.query.platform);
  new ApiSuccess(res, config, "Config retrieved successfully");
});

module.exports = {
  getConfig
};
