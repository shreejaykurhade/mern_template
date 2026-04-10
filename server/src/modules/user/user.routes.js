const express = require('express');
const router = express.Router();
const userController = require('./user.controller');
const { authenticate } = require('../../middleware/auth');
const authorize = require('../../middleware/roleCheck');
const validate = require('../../middleware/validate');
const {
  updateProfileSchema,
  updateUserRoleSchema,
  getUserByIdSchema,
  listUsersSchema,
} = require('./user.validation');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 */

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get current user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 */

// ── Current user routes ──
router.get('/me', authenticate, userController.getMe);
router.put('/me', authenticate, validate(updateProfileSchema), userController.updateMe);

// ── Admin routes ──
router.get(
  '/',
  authenticate,
  authorize('admin'),
  validate(listUsersSchema),
  userController.getAllUsers,
);

router.get(
  '/:id',
  authenticate,
  authorize('admin'),
  validate(getUserByIdSchema),
  userController.getUserById,
);

router.put(
  '/:id',
  authenticate,
  authorize('admin'),
  validate(getUserByIdSchema),
  userController.updateUser,
);

router.patch(
  '/:id/role',
  authenticate,
  authorize('admin'),
  validate(updateUserRoleSchema),
  userController.updateUserRole,
);

router.patch(
  '/:id/deactivate',
  authenticate,
  authorize('admin'),
  validate(getUserByIdSchema),
  userController.deactivateUser,
);

router.delete(
  '/:id',
  authenticate,
  authorize('admin'),
  validate(getUserByIdSchema),
  userController.deleteUser,
);

module.exports = router;
