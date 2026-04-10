const UserRepository = require('../user/user.repository');
const ApiError = require('../../utils/ApiError');
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
  setRefreshTokenCookie,
  clearRefreshTokenCookie,
} = require('../../utils/tokens');

class AuthService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  /**
   * Register a new user.
   */
  async register({ name, email, password }) {
    // Check for existing user
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw ApiError.conflict('Email already registered');
    }

    // Create user (password is hashed by pre-save hook)
    const user = await this.userRepository.create({ name, email, password });

    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Store refresh token in DB
    await this.userRepository.storeRefreshToken(user._id, refreshToken);

    return { user, accessToken, refreshToken };
  }

  /**
   * Login with email and password.
   */
  async login({ email, password }) {
    // Find user with password field included
    const user = await this.userRepository.findByEmailWithPassword(email);
    if (!user) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    if (!user.isActive) {
      throw ApiError.forbidden('Account has been deactivated. Contact support.');
    }

    // Verify password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    // Generate tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Store refresh token & update last login
    await Promise.all([
      this.userRepository.storeRefreshToken(user._id, refreshToken),
      this.userRepository.updateLastLogin(user._id),
    ]);

    // Remove password from response
    user.password = undefined;

    return { user, accessToken, refreshToken };
  }

  /**
   * Refresh the access token using a valid refresh token.
   */
  async refreshAccessToken(refreshTokenFromCookie) {
    if (!refreshTokenFromCookie) {
      throw ApiError.unauthorized('No refresh token provided');
    }

    // Verify the refresh token
    let decoded;
    try {
      decoded = verifyRefreshToken(refreshTokenFromCookie);
    } catch {
      throw ApiError.unauthorized('Invalid or expired refresh token');
    }

    // Find user and check stored refresh token matches
    const user = await this.userRepository.findByIdWithRefreshToken(decoded.id);
    if (!user || user.refreshToken !== refreshTokenFromCookie) {
      throw ApiError.unauthorized('Refresh token is invalid or has been revoked');
    }

    // Rotate refresh token (security best practice)
    const newAccessToken = generateAccessToken(user._id);
    const newRefreshToken = generateRefreshToken(user._id);

    await this.userRepository.storeRefreshToken(user._id, newRefreshToken);

    return { user, accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  /**
   * Logout — clear refresh token from DB and cookie.
   */
  async logout(userId, res) {
    await this.userRepository.clearRefreshToken(userId);
    clearRefreshTokenCookie(res);
  }

  /**
   * Change password for authenticated user.
   */
  async changePassword(userId, { currentPassword, newPassword }) {
    const user = await this.userRepository.findByIdWithPassword(userId);
    if (!user) {
      throw ApiError.notFound('User not found');
    }

    const isMatch = await user.matchPassword(currentPassword);
    if (!isMatch) {
      throw ApiError.unauthorized('Current password is incorrect');
    }

    user.password = newPassword;
    await user.save(); // triggers pre-save hash

    // Invalidate all refresh tokens by generating a new one
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);
    await this.userRepository.storeRefreshToken(user._id, refreshToken);

    return { accessToken, refreshToken };
  }
}

module.exports = new AuthService();
