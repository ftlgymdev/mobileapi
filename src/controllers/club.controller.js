const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { clubService } = require("../services");
const ApiSuccess = require("../utils/ApiSuccess");

const getClubs = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["cityId"]);
  const options = pick(req.query, ["sortBy", "sortType", "limit", "page"]);
  const search = req.query.search
    ? Object.fromEntries(
      Object.entries(req.query.search).filter(([key, value]) => value !== '' && value != null)
    )
    : {};
  if (Object.keys(search).length > 0) {
    filter.search = search;
  }
  const result = await clubService.queryClubs(filter, options);
  new ApiSuccess(res, result, "Club retrieved successfully");
});

const getClub = catchAsync(async (req, res) => {
  const club = await clubService.getClubById(req.params.clubId);
  if (!club) {
    throw new ApiError(httpStatus.NOT_FOUND, "Club not found");
  }
  new ApiSuccess(res, club, "Club retrieved successfully");
});

module.exports = {
  getClubs,
  getClub,
};