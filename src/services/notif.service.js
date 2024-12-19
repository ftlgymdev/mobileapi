// const { User, UserRole } = require("@prisma/client");
// const httpStatus = require("http-status");
// const { PrismaClient } = require("@prisma/client/extension");
const { Prisma, PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
// const prisma = require("../client");

// const ApiError = require("../utils/ApiError");
// const { encryptPassword } = require("../utils/encryption");

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
  if (filter.title) {
    where.title = { contains: filter.title }; // Case-insensitive search
  }
  //   const datasas = keys.reduce((obj, k) => ({ ...obj, [k]: true }), {});
  //   const apatu = {
  //     id: true,
  //     name: true,
  //     city_id: false,
  //     created_at: true,
  //     updated_at: true,
  //   };

  const clubs = await prisma.notification.findMany({
    where, // Use generated where condition
    // select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
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
