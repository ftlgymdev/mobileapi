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
const queryClubs = async (filter, options) => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? "desc";
  const search = filter.search || {};
  const where = {
    city_id: filter.cityId ? parseInt(filter.cityId, 10) : undefined,
    ...(search.name && {
      name: { contains: search.name.toLowerCase() },
    })
  };
  console.log('where', where)
  const totalRecords = await prisma.club.count({ where });
  const clubs = await prisma.club.findMany({
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
    path: `${config.app.url}/v1/clubs`,
    queryParams,
  });
  return {
    data: clubs,
    ...pagination,
  };
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<Club, Key> | null>}
 */
const getClubById = async (id) => {
  return prisma.club.findUnique({
    where: { id }
  });
};

module.exports = {
  queryClubs,
  getClubById
};
