const catchAsync = require('../../utils/catchAsync');
const ApiResponse = require('../../utils/ApiResponse');
const userService = require('./user.service');

/**
 * @desc    Get current user profile
 * @route   GET /api/v1/users/me
 * @access  Private
 */
const getMe = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.user._id);
  ApiResponse.ok(user, 'Profile retrieved').send(res);
});

/**
 * @desc    Update current user profile
 * @route   PUT /api/v1/users/me
 * @access  Private
 */
const updateMe = catchAsync(async (req, res) => {
  const user = await userService.updateUser(req.user._id, req.body);
  ApiResponse.ok(user, 'Profile updated').send(res);
});

/**
 * @desc    Get all users (admin)
 * @route   GET /api/v1/users
 * @access  Private/Admin
 */
const getAllUsers = catchAsync(async (req, res) => {
  const result = await userService.getAllUsers(req.query);
  res.status(200).json({
    success: true,
    message: 'Users retrieved',
    data: result.docs,
    pagination: result.pagination,
  });
});

/**
 * @desc    Get user by ID (admin)
 * @route   GET /api/v1/users/:id
 * @access  Private/Admin
 */
const getUserById = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  ApiResponse.ok(user, 'User retrieved').send(res);
});

/**
 * @desc    Update user by ID (admin)
 * @route   PUT /api/v1/users/:id
 * @access  Private/Admin
 */
const updateUser = catchAsync(async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  ApiResponse.ok(user, 'User updated').send(res);
});

/**
 * @desc    Update user role (admin)
 * @route   PATCH /api/v1/users/:id/role
 * @access  Private/Admin
 */
const updateUserRole = catchAsync(async (req, res) => {
  const user = await userService.updateUserRole(req.params.id, req.body.role);
  ApiResponse.ok(user, 'User role updated').send(res);
});

/**
 * @desc    Delete user (admin)
 * @route   DELETE /api/v1/users/:id
 * @access  Private/Admin
 */
const deleteUser = catchAsync(async (req, res) => {
  await userService.deleteUser(req.params.id);
  ApiResponse.ok(null, 'User deleted').send(res);
});

/**
 * @desc    Deactivate user (admin)
 * @route   PATCH /api/v1/users/:id/deactivate
 * @access  Private/Admin
 */
const deactivateUser = catchAsync(async (req, res) => {
  const user = await userService.deactivateUser(req.params.id);
  ApiResponse.ok(user, 'User deactivated').send(res);
});

module.exports = {
  getMe,
  updateMe,
  getAllUsers,
  getUserById,
  updateUser,
  updateUserRole,
  deleteUser,
  deactivateUser,
};
