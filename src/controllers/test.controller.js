const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const ApiSuccess = require('../utils/ApiSuccess');
const { authService, tokenService, gymMasterApiService } = require('../services');

const loginGymMasterApi = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  try {
    await gymMasterApiService.login({ email: email, password: password });
    const token = await gymMasterApiService.getToken();
  } catch (error) {
    console.error('Error:', error.message);
  }
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  new ApiSuccess(res, { user, tokens }, 'User logged in successfully');
});


module.exports = {
  loginGymMasterApi
};
