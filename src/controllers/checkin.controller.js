const catchAsync = require('../utils/catchAsync');
const { gymMasterApiService } = require('../services');
const ApiSuccess = require('../utils/ApiSuccess');
const httpStatus = require('http-status');

const checkin = catchAsync(async (req, res) => {
    console.log('req', req);
    new ApiSuccess(res, req.user, 'Checkin fetched successfully', httpStatus.OK);
});

module.exports = {
    checkin
};