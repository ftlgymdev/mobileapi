const httpStatus = require("http-status");

class ApiSuccess {
  constructor(res, data, message = "Success", statusCode = httpStatus.OK) {
    req.setTimeout(10000, () => {
      res
        .status(408)
        .json({ message: "Request timeout. Please try again later." });
    });

    res.status(statusCode).json({
      code: statusCode,
      status: "success",
      message,
      data,
    });
  }
}

module.exports = ApiSuccess;
