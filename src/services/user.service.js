const { User, UserRole } = require("@prisma/client");
const httpStatus = require("http-status");
const prisma = require("../client");
const ApiError = require("../utils/ApiError");
const { encryptPassword } = require("../utils/encryption");

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (email, password, first_name, last_name, role = UserRole.USER) => {
  if (await getUserByEmail(email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  return prisma.user.create({
    data: {
      email,
      first_name,
      last_name,
      password: await encryptPassword(password),
      role,
    },
  });
};

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUserNotif = async (title, message) => {
  return prisma.notification.create({
    data: {
      title,
      message,
    },
  });
};

/**
 * Query for users
 * @param {Object} filter - Prisma filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (
  filter,
  options,
  keys = [
    "id",
    "email",
    "first_name",
    "last_name",
    "password",
    "role",
    "is_email_verified",
    "createdAt",
    "updatedAt",
  ]
) => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? "desc";
  const users = await prisma.user.findMany({
    where: filter,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    skip: (page - 1) * limit, // Corrected to (page - 1) * limit
    take: limit,
    orderBy: sortBy ? { [sortBy]: sortType } : undefined,
  });
  return users;
};

/**
 * Query for users
 * @param {Object} filter - Prisma filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsersNotif = async (
  filter,
  options,
  keys = [
    "id",
    "senderId",
    "first_name",
    "last_name",
    "password",
    "role",
    "is_email_verified",
    "createdAt",
    "updatedAt",
  ]
) => {
  const page = options.page ?? 1;
  const limit = options.limit ?? 10;
  const sortBy = options.sortBy;
  const sortType = options.sortType ?? "desc";

  const where = {};
  if (filter.title) {
    where.title = { contains: filter.title }; // Case-insensitive search
  }
  const users = await prisma.notification.findMany({
    where: where,
    // select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
    // select: {},
    skip: (page - 1) * limit, // Corrected to (page - 1) * limit
    take: limit,
    orderBy: sortBy ? { [sortBy]: sortType } : undefined,
  });
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<User, Key> | null>}
 */
const getUserById = async (
  id,
  keys = [
    "id",
    "email",
    "first_name",
    "last_name",
    "password",
    "role",
    "is_email_verified",
    "createdAt",
    "updatedAt",
  ]
) => {
  return prisma.user.findUnique({
    where: { id },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
  });
};

/**
 * Get user by email
 * @param {string} email
 * @param {Array<Key>} keys
 * @returns {Promise<Pick<User, Key> | null>}
 */
const getUserByEmail = async (
  email,
  keys = [
    "id",
    "email",
    "first_name",
    "last_name",
    "password",
    "role",
    "is_email_verified",
    "created_at",
    "updated_at",
  ]
) => {
  console.log({ 'keys': keys });
  return prisma.user.findUnique({
    where: { email },
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
  });
};

/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (
  userId,
  updateBody,
  keys = ["id", "email", "first_name", "last_name", "role"]
) => {
  const user = await getUserById(userId, ["id", "email", "first_name", "last_name"]);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  if (updateBody.email && (await getUserByEmail(updateBody.email))) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken");
  }
  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: updateBody,
    select: keys.reduce((obj, k) => ({ ...obj, [k]: true }), {}),
  });
  return updatedUser;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  await prisma.user.delete({ where: { id: user.id } });
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  getUserByEmail,
  queryUsersNotif,
  updateUserById,
  deleteUserById,
  createUserNotif,
};
