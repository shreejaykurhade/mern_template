const ApiError = require('../utils/ApiError');

/**
 * Zod schema validation middleware factory.
 *
 * Usage:
 *   const { z } = require('zod');
 *   const schema = z.object({ body: z.object({ email: z.string().email() }) });
 *   router.post('/login', validate(schema), controller.login);
 */
const validate = (schema) => (req, _res, next) => {
  const result = schema.safeParse({
    body: req.body,
    query: req.query,
    params: req.params,
  });

  if (!result.success) {
    const errors = result.error.issues.map((issue) => ({
      field: issue.path.join('.'),
      message: issue.message,
    }));
    return next(ApiError.badRequest('Validation failed', errors));
  }

  // Replace req data with parsed (and potentially transformed) values
  req.body = result.data.body ?? req.body;
  req.query = result.data.query ?? req.query;
  req.params = result.data.params ?? req.params;

  next();
};

module.exports = validate;
