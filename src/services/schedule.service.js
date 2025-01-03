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
  const totalRecords = await prisma.schedule.count({ where: filter });
  const schedules = await prisma.schedule.findMany({
    where: filter,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: sortBy ? { [sortBy]: sortType } : undefined,
  });
  const queryParams = {
    companyid: '1',
    arrival: '2024-12-31',
    sortBy: 'title',
    sortType: 'asc',
  };
  const pagination = generatePagination({
    totalRecords,
    page,
    limit,
    path: `${config.app.url}/v1/class-schedules`,
    queryParams
  });
  const data = {
    data: schedules,
    ...pagination,
  }
  return data;
};


// const querySchedules = async (filter, options) => {
//   const page = options.page ?? 1;
//   const limit = options.limit ?? 10;
//   const sortBy = options.sortBy;
//   const sortType = options.sortType ?? "desc";
//   const notInFilter = filter.notInField
//     ? { [filter.notInField]: { notIn: filter.notInValues ?? [] } }
//     : {};
//   const totalRecords = await prisma.schedule.count({
//     where: {
//       ...filter,
//       ...notInFilter,
//     },
//   });
//   const schedules = await prisma.schedule.findMany({
//     where: {
//       ...filter,
//       ...notInFilter,
//     },
//     skip: (page - 1) * limit,
//     take: limit,
//     orderBy: sortBy ? { [sortBy]: sortType } : undefined,
//   });
//   const totalPages = Math.ceil(totalRecords / limit);
//   const firstPageUrl = `/jobs?page=1`;
//   const lastPageUrl = `https://api-hrd.ftlgym.com/jobs?page=${totalPages}`;
//   const prevPageUrl = page > 1 ? `https://api-hrd.ftlgym.com/jobs?page=${page - 1}` : null;
//   const nextPageUrl = page < totalPages ? `https://api-hrd.ftlgym.com/jobs?page=${page + 1}` : null;
//   const path = `https://api-hrd.ftlgym.com/jobs`;
//   const data = {
//     current_page: page,
//     data: schedules,
//     first_page_url: firstPageUrl,
//     from: (page - 1) * limit + 1,
//     last_page: totalPages,
//     last_page_url: lastPageUrl,
//     next_page_url: nextPageUrl,
//     path: path,
//     per_page: limit,
//     prev_page_url: prevPageUrl,
//     to: page * limit < totalRecords ? page * limit : totalRecords,
//     total: totalRecords,
//   };
//   return data;
// };



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
