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

const getGxClass = catchAsync(async (req, res) => {
  console.log("tai", req.query?.date);
  let date = req.query?.date;
  let id = req.query.id;
  //schedule.companyid = club id

  console.log({ date, id });

  const gxClass = `SELECT schedule.*, category_class.category
FROM schedule
JOIN class ON schedule.classid = class.classid
LEFT JOIN category_class ON class.category_class_id = category_class.id
WHERE schedule.companyid = "${id}" AND date(arrival) BETWEEN "${date}" AND "${date}"
ORDER BY schedule.arrival DESC , schedule.starttime DESC LIMIT 1000`;

  db.query(gxClass, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error fetching data" });
    } else {
      new ApiSuccess(res, results, "Users retrieved successfully");
    }
  });
});

const getPilates = catchAsync(async (req, res) => {
  //ini saja
  const gxPilates = `SELECT schedule.*, category_class.category
FROM schedule
JOIN class ON schedule.classid = class.classid
LEFT JOIN category_class ON class.category_class_id = category_class.id
WHERE schedule.companyid = '66'
ORDER BY schedule.updated_at DESC`;

  db.query(gxPilates, (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "Error fetching data" });
    } else {
      new ApiSuccess(res, results, "Users retrieved successfully");
    }
  });
});

module.exports = {
  getPilates,
  getGxClass,
};
