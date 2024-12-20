const catchAsync = require("../utils/catchAsync");
const {
  authService,
  userService,
  tokenService,
  emailService,
  clubService,
} = require("../services");
const exclude = require("../utils/exclude");
const ApiSuccess = require("../utils/ApiSuccess");
const httpStatus = require("http-status");
const pick = require("../utils/pick");

const db = require("../config/db");

const getClubs = catchAsync(async (req, res) => {
  // console.log("Authenticated User:", req.user.id);
  new ApiSuccess(
    res,
    { dery: "dery" },
    "Club fetched successfully",
    httpStatus.OK
  );
  //   return res.json({ dery: "dery" });
});

const getClubsss = catchAsync(async (req, res) => {
  const filter = pick(req.query, ["name"]);
  const options = pick(req.query, ["sortBy", "limit", "page"]);
  const result = await clubService.queryClubs(filter, options);
  new ApiSuccess(res, result, "Users retrieved successfully");
});

const getClub = catchAsync(async (req, res) => {
  const getClub = `SELECT * FROM club  LIMIT 100`;

  const getGroup = `
      select package_group.id as "package_group_id" , package_group.title AS "package_group_title", package.id , package.membership_type_id , package.title , package.duration, package.price
  FROM package
  JOIN package_group on package_group.id = package.package_group_id WHERE package_group.id = 511 LIMIT 100
    `;

  const getPT = `
  SELECT user.*, club.name club_name, user_role.role_id, CONCAT_WS("",user_file.file_path, user_file.file_name) as user_image
  FROM user
  LEFT JOIN user_role ON user_role.user_id = user.id
  LEFT JOIN user_club ON user_club.user_id = user.id
  LEFT JOIN club ON club.id = user_club.club_id
  LEFT JOIN user_file ON user_file.user_id = user.id AND user_file.file_type_id = 18
  WHERE user.status IN(1, 2, 3, 4, 5, 6)
  AND user_role.role_id IN(11)
  AND club.id = '2' //get club id
  AND user_club.status = 1
  GROUP BY user_club.user_id
  ORDER BY user.first_name ASC
   LIMIT 1000`;

  //schedule.companyid = club id
  const gxClass = `SELECT schedule.*, category_class.category
FROM schedule
JOIN class ON schedule.classid = class.classid
LEFT JOIN category_class ON class.category_class_id = category_class.id
WHERE schedule.companyid = '2' 
ORDER BY schedule.updated_at DESC`;

  //ini saja
  const gxPilates = `SELECT schedule.*, category_class.category
FROM schedule
JOIN class ON schedule.classid = class.classid
LEFT JOIN category_class ON class.category_class_id = category_class.id
WHERE schedule.companyid = '66'
ORDER BY schedule.updated_at DESC`;

  //0 =male 1=female

  // const results = db.query(query); // Hasil query
  // console.log({ results });
  db.query(getClub, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error fetching data" });
    } else {
      new ApiSuccess(res, results, "Users retrieved successfully");
    }
  });
});

module.exports = {
  getClub,
};
