const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { userService } = require("../services");
const ApiSuccess = require("../utils/ApiSuccess");
const db = require("../config/db");

const createUser = catchAsync(async (req, res) => {
  const { email, password, name, role } = req.body;
  const user = await userService.createUser(email, password, name, role);
  new ApiSuccess(res, user, "User created successfully", httpStatus.CREATED);
});

const getUsers = catchAsync(async (req, res) => {
  // httlpsa
  const filter = pick(req.query, ["name", "role"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await userService.queryUsers(filter, options);
  new ApiSuccess(res, result, "Users retrieved successfully");
});

const getUsersNotif = catchAsync(async (req, res) => {
  // httlpsa
  // console.log("Authenticated User:", res);

  const filter = pick(req.query, ["title"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await userService.queryUsersNotif(filter, options);
  new ApiSuccess(res, result, "Users retrieved successfully");
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }
  new ApiSuccess(res, user, "User retrieved successfully");
});

const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUserById(req.params.userId, req.body);
  new ApiSuccess(res, user, "User updated successfully");
});

const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUserById(req.params.userId);
  new ApiSuccess(res, null, "User deleted successfully", httpStatus.NO_CONTENT);
});

const createUserNotif = catchAsync(async (req, res) => {
  const { title, message } = req.body;
  const user = await userService.createUserNotif(title, message);
  new ApiSuccess(res, user, "User created successfully", httpStatus.CREATED);
});

const getMember = catchAsync(async (req, res) => {
  console.log("tai", req.user.id);
  let date = req.user.id;

  //berdasarkan member.id =1734203603
  const dataProfile = `SELECT 
    member.id,
    member.member_id,
    member.card_number,
    CONCAT_WS(' ', member.first_name, member.last_name) AS "member_name",
    member.dob,
    member.gender,
    member.email,
    member.phone,
    member.weight,
    member.height,
    member.address,
    club.id AS "club_id",
    club.name AS "club_name",
    CONCAT('assets/img/profile/',member_file.file_path,member_file.file_name) AS "member_profile"
FROM member
LEFT JOIN club ON club.id = member.club_id
LEFT JOIN member_file ON member_file.member_id = member.id
WHERE member.id = ${date}
   AND member_file.file_type_id = 1
ORDER BY member.updated_at DESC`;
  db.query(dataProfile, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error fetching data" });
    } else {
      new ApiSuccess(res, results, "Users retrieved successfully");
    }
  });
});

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUsersNotif,
  createUserNotif,
  getMember,
};
