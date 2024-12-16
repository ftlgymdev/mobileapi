const { UserRole } = require("@prisma/client");

const allRoles = {
  [UserRole.USER]: ["getProfile", "getClubs", "getUsers"],
  [UserRole.ADMIN]: ["getUsers", "manageUsers"],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
