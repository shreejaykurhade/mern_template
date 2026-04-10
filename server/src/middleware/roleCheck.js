const ApiError = require('../utils/ApiError');

/**
 * Role-based authorization middleware factory.
 * Must be used AFTER the authenticate middleware (req.user must exist).
 *
 * Usage: router.get('/admin', authenticate, authorize('admin'), controller.fn);
 *        router.get('/mod', authenticate, authorize('admin', 'moderator'), controller.fn);
 */
const authorize = (...roles) => {
  return (req, _res, next) => {
    if (!req.user) {
      return next(ApiError.unauthorized('Authentication required.'));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        ApiError.forbidden(`Role '${req.user.role}' is not authorized to access this resource.`),
      );
    }

    next();
  };
};

module.exports = authorize;
