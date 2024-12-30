const catchAsync = require('../utils/catchAsync');
const { gymMasterApiService } = require('../services');
const ApiSuccess = require('../utils/ApiSuccess');
const httpStatus = require('http-status');
const axios = require('axios');
const qs = require('qs');
const ApiError = require("../utils/ApiError");

const checkin = catchAsync(async (req, res) => {
    const { qr_value } = req.body;
    const url = new URL(qr_value);
    const extractedString = url.pathname;
    const memberId = parseInt(req.user.member_id);
    const gymMasterToken = await gymMasterApiService.getTokenByMemberId(memberId);
    const data = {
        api_key: process.env.GYMMASTER_API_KEY,
        token: gymMasterToken.token
    };
    const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    const door = await gymMasterApiService.post(extractedString, qs.stringify(data), headers);
    if (door.parameters && door.parameters.doorid) {
        const gymMasterToken = await gymMasterApiService.getTokenByMemberId(memberId);
        const data = {
            api_key: process.env.GYMMASTER_API_KEY,
            token: gymMasterToken.token,
            doorid: door.parameters.doorid
        };
        const headers = { 'Content-Type': 'application/json' };
        const checkin = await gymMasterApiService.post('/portal/api/v2/member/kiosk/checkin', data, headers);
        if (checkin.error === null) {
            new ApiSuccess(res, checkin.result.response, checkin.result.response.message, httpStatus.OK);
        } else {
            throw new ApiError(httpStatus.OK, door.error);
        }
    } else {
        throw new ApiError(httpStatus.OK, door.error);
    }
});

module.exports = {
    checkin
};