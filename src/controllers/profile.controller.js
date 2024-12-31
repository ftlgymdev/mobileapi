const catchAsync = require('../utils/catchAsync');
const { userService, userFileService } = require('../services');
const exclude = require('../utils/exclude');
const ApiSuccess = require('../utils/ApiSuccess');
const helper = require('../utils/helper');
const httpStatus = require('http-status');


const getProfile = catchAsync(async (req, res) => {
    const fileTypeIdProfilePhoto = 1;
    const userFileProfilePhoto = await userFileService.getUserFileByUserIdAndFileTypeId(req.user.id, fileTypeIdProfilePhoto);
    if (userFileProfilePhoto) {
        profilePhoto = helper.previewAsset(process.env.BASE_URL_HORIZON, '/assets/img/profile/', userFileProfilePhoto.file_path, userFileProfilePhoto.file_name);
    } else {
        profilePhoto = helper.previewAsset(process.env.BASE_URL_HORIZON, '/assets/img/profile/', '', '');
    }
    const user = await userService.getUserById(req.user.id);
    const data = {
        id: user.id.toString(),
        member_id: user.member_id.toString(),
        card_number: user.card_number,
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        full_name: `${user.first_name || ""} ${user.last_name || ""}`.trim(),
        email: user.email || "",
        phone: user.phone || "",
        total_visit: 10,
        total_visit_str: "10 Visit",
        weight: 60,
        weight_str: "60 Kg",
        height: 172,
        height_str: "172 Cm",
        balance: "10000000",
        balance_str: "Rp10,000,000",
        membership_left: "10 days left (15 Oct 2024)",
        profile_photo: profilePhoto
    };
    new ApiSuccess(res, data, 'Profile fetched successfully', httpStatus.OK);
});

module.exports = {
    getProfile
};