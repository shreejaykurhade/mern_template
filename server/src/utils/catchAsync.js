/**
 * Wraps an async route handler to catch errors automatically.
 * Eliminates try/catch boilerplate in every controller.
 *
 * Usage: router.get('/users', catchAsync(async (req, res) => { ... }));
 */
const catchAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = catchAsync;
