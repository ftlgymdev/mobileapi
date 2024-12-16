// const { User, UserRole } = require("@prisma/client");
// const httpStatus = require("http-status");
// const { PrismaClient } = require("@prisma/client/extension");
const { Prisma, PrismaClient } = require("@prisma/client");

// const prisma = require("../client");

const prisma = new PrismaClient();
// const ApiError = require("../utils/ApiError");
// const { encryptPassword } = require("../utils/encryption");

/**
 * Query for users
 * @param {Object} filter - Prisma filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const quesryClubs = async (
  filter,
  options,
  keys = ["id", "name", "city_id", "created_at", "updated_at"]
) => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? "desc";
  const clubs = await prisma.club.findMany();

  const users = await prisma.club.findMany({
    where: filter,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    skip: (page - 1) * limit, // Corrected to (page - 1) * limit
    take: limit,
    orderBy: sortBy ? { [sortBy]: sortType } : undefined,
  });
  return users;
};

const queryClubs = async (
  filter,
  options,
  keys = ["id", "name", "city_id", "created_at", "updated_at"]
) => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? "desc";

  // Generate Prisma where condition
  const where = {};
  if (filter.name) {
    where.name = { contains: filter.name }; // Case-insensitive search
  }
  //   const datasas = keys.reduce((obj, k) => ({ ...obj, [k]: true }), {});
  //   const apatu = {
  //     id: true,
  //     name: true,
  //     city_id: false,
  //     created_at: true,
  //     updated_at: true,
  //   };

  const clubs = await prisma.club.findMany({
    where, // Use generated where condition
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    // select: datasas,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: sortBy ? { [sortBy]: sortType } : undefined,
  });
  return clubs;
};
module.exports = {
  queryClubs,
};
