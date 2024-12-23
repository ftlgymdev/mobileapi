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

const getTrainer = catchAsync(async (req, res) => {
  const getPT = `
  SELECT user.*, club.name club_name, user_role.role_id, CONCAT_WS("",user_file.file_path, user_file.file_name) as user_image
  FROM user
  LEFT JOIN user_role ON user_role.user_id = user.id
  LEFT JOIN user_club ON user_club.user_id = user.id
  LEFT JOIN club ON club.id = user_club.club_id
  LEFT JOIN user_file ON user_file.user_id = user.id AND user_file.file_type_id = 18
  WHERE user.status IN(1, 2, 3, 4, 5, 6)
  AND user_role.role_id IN(11)
  AND club.id = '2'
  AND user_club.status = 1
  GROUP BY user_club.user_id
  ORDER BY user.first_name ASC
   LIMIT 1000`;

  //0 =male 1=female

  // const results = db.query(query); // Hasil query
  // console.log({ results });
  db.query(getPT, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error fetching data" });
    } else {
      new ApiSuccess(res, results, "Users retrieved successfully");
    }
  });
});

module.exports = {
  getTrainer,
};
