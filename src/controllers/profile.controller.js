const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService } = require('../services');
const exclude = require('../utils/exclude');
const ApiSuccess = require('../utils/ApiSuccess');
const httpStatus = require('http-status');

const getProfile = catchAsync(async (req, res) => {
    console.log('Authenticated User:', req.user.id);
    new ApiSuccess(res, req.user, 'Profile fetched successfully', httpStatus.OK);
});

module.exports = {
    getProfile
};