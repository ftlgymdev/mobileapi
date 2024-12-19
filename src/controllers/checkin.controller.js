const catchAsync = require('../utils/catchAsync');
const { gymMasterApiService } = require('../services');
const ApiSuccess = require('../utils/ApiSuccess');
const httpStatus = require('http-status');

const checkin = catchAsync(async (req, res) => {
    const { qr_value } = req.body;
    const url = new URL(qr_value);
    const extractedString = url.pathname;
    const headers = {
        'Content-Type': 'x-wwww-form-urlencode'
    };
    const door = await gymMasterApiService.post(extractedString, headers);
    console.log('doorrrrr', door);
    new ApiSuccess(res, req.user, 'Checkin fetched successfully', httpStatus.OK);
});

module.exports = {
    checkin
};