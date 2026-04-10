const catchAsync = require('../../utils/catchAsync');
const ApiResponse = require('../../utils/ApiResponse');
const authService = require('./auth.service');
const { setRefreshTokenCookie } = require('../../utils/tokens');

/**
 * Helper to send auth response with tokens.
 */
const sendAuthResponse = (res, statusCode, data, message) => {
  // Set refresh token as httpOnly cookie
  setRefreshTokenCookie(res, data.refreshToken);

  // Send access token in response body (client stores in memory)
  res.status(statusCode).json({
    success: true,
    message,
    data: {
      user: data.user,
      accessToken: data.accessToken,
    },
  });
};

/**
 * @desc    Register a new user
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
const register = catchAsync(async (req, res) => {
  const { name, email, password } = req.body;
  const result = await authService.register({ name, email, password });
  sendAuthResponse(res, 201, result, 'Registration successful');
});

/**
 * @desc    Login user
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.login({ email, password });
  sendAuthResponse(res, 200, result, 'Login successful');
});

/**
 * @desc    Refresh access token
 * @route   POST /api/v1/auth/refresh-token
 * @access  Public (requires refresh token cookie)
 */
const refreshToken = catchAsync(async (req, res) => {
  const token = req.cookies?.refreshToken;
  const result = await authService.refreshAccessToken(token);
  sendAuthResponse(res, 200, result, 'Token refreshed');
});

/**
 * @desc    Logout user
 * @route   POST /api/v1/auth/logout
 * @access  Private
 */
const logout = catchAsync(async (req, res) => {
  await authService.logout(req.user._id, res);
  ApiResponse.ok(null, 'Logged out successfully').send(res);
});

/**
 * @desc    Get current authenticated user
 * @route   GET /api/v1/auth/me
 * @access  Private
 */
const getMe = catchAsync(async (req, res) => {
  ApiResponse.ok(req.user, 'User retrieved').send(res);
});

/**
 * @desc    Change password
 * @route   POST /api/v1/auth/change-password
 * @access  Private
 */
const changePassword = catchAsync(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const result = await authService.changePassword(req.user._id, {
    currentPassword,
    newPassword,
  });
  sendAuthResponse(res, 200, { ...result, user: req.user }, 'Password changed');
});

module.exports = {
  register,
  login,
  refreshToken,
  logout,
  getMe,
  changePassword,
};
