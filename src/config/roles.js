const { UserRole } = require("@prisma/client");

const allRoles = {
  [UserRole.USER]: [
    "getProfile",
    "getClubs",
    "getClass",
    "getUsers",
    "userNotif",
    "getNotif",
    "creteNotif",
    "getVersi",
    "checkin",
  ],
  [UserRole.ADMIN]: ["getUsers", "manageUsers"],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
