const { UserRole } = require("@prisma/client");

const allRoles = {
  [UserRole.USER]: [
    "getProfile",
    "getClubs",
    "getClub",
    "getUsers",
    "userNotif",
    "getNotif",
    "creteNotif",
    "getVersi",
    "checkin",
    "getSchedules",
    "getSchedule",
  ],
  [UserRole.ADMIN]: ["getUsers", "manageUsers"],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
