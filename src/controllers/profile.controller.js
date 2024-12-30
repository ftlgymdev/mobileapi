const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService, emailService } = require('../services');
const exclude = require('../utils/exclude');
const ApiSuccess = require('../utils/ApiSuccess');
const httpStatus = require('http-status');

const getProfile = catchAsync(async (req, res) => {
    var user = await userService.getUserById(req.user.id);
    const data = {
        id: user.id.toString(),
        member_id: user.member_id.toString(),
        card_number: user.card_number,
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        full_name: `${user.first_name || ""} ${user.last_name || ""}`.trim(),
        email: user.email || "",
        phone: user.phone || "",
        total_visit: "10",
        total_visit_str: "10 Visit",
        weight: "60",
        weight_str: "60 Kg",
        height: "172",
        height_str: "172 Cm",
        balance: "10000000",
        balance_str: "Rp10,000,000",
        membership_left: "10 days left (15 Oct 2024)",
    };
    new ApiSuccess(res, data, 'Profile fetched successfully', httpStatus.OK);
});

module.exports = {
    getProfile
};