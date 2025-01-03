const httpStatus = require("http-status");
const prisma = require("../client");
const ApiError = require("../utils/ApiError");
const config = require('../config/config');
const { generatePagination } = require('./pagination.service');

/**
 * Query for classes
 * @param {Object} filter - Prisma filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const querySchedules = async (filter, options) => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? "desc";
  const search = filter.search || {};
  const where = {
    companyid: filter.companyid ? parseInt(filter.companyid, 10) : undefined,
    arrival: filter.arrival ? filter.arrival : undefined,
    ...(search.classname && {
      classname: { contains: search.classname.toLowerCase() },
    }),
    ...(search.location && {
      location: { contains: search.location.toLowerCase() },
    }),
  };
  const totalRecords = await prisma.schedule.count({ where });
  const schedules = await prisma.schedule.findMany({
    where,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: sortBy ? { [sortBy]: sortType } : undefined,
  });
  const queryParams = {
    ...filter,
    sortBy,
    sortType,
  };
  const pagination = generatePagination({
    totalRecords,
    page,
    limit,
    path: `${config.app.url}/v1/class-schedules`,
    queryParams,
  });
  return {
    data: schedules,
    ...pagination,
  };
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<Schedule, Key> | null>}
 */
const getScheduleById = async (id) => {
  return prisma.schedule.findUnique({
    where: { id }
  });
};

module.exports = {
  querySchedules,
  getScheduleById
};
