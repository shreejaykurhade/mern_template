const ApiError = require('../utils/ApiError');
const { verifyAccessToken } = require('../utils/tokens');
const UserRepository = require('../modules/user/user.repository');

const userRepository = new UserRepository();

/**
 * Authentication middleware.
 * Extracts JWT from Authorization header or cookie, verifies it,
 * and attaches the user to req.user.
 */
const authenticate = async (req, _res, next) => {
  try {
    let token;

    // 1. Check Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }

    // 2. Fallback to cookie
    if (!token && req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      throw ApiError.unauthorized('Access denied. No token provided.');
    }

    // 3. Verify token
    const decoded = verifyAccessToken(token);

    // 4. Check if user still exists
    const user = await userRepository.findById(decoded.id);
    if (!user) {
      throw ApiError.unauthorized('User no longer exists.');
    }

    if (!user.isActive) {
      throw ApiError.forbidden('Account has been deactivated.');
    }

    // 5. Attach user to request
    req.user = user;
    next();
  } catch (error) {
    if (error instanceof ApiError) {
      return next(error);
    }
    // JWT errors (expired, malformed, etc.)
    if (error.name === 'JsonWebTokenError') {
      return next(ApiError.unauthorized('Invalid token.'));
    }
    if (error.name === 'TokenExpiredError') {
      return next(ApiError.unauthorized('Token expired.'));
    }
    next(ApiError.unauthorized('Authentication failed.'));
  }
};

/**
 * Optional auth — attaches user if token is present, but doesn't block.
 */
const optionalAuth = async (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = verifyAccessToken(token);
      req.user = await userRepository.findById(decoded.id);
    }
  } catch {
    // Silently continue without user
  }
  next();
};

module.exports = { authenticate, optionalAuth };
