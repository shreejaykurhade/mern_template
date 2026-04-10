const { z } = require('zod');

const updateProfileSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name cannot exceed 50 characters')
      .optional(),
    avatar: z.string().url('Avatar must be a valid URL').optional(),
  }),
});

const updateUserRoleSchema = z.object({
  body: z.object({
    role: z.enum(['user', 'admin'], {
      errorMap: () => ({ message: 'Role must be either user or admin' }),
    }),
  }),
  params: z.object({
    id: z.string().min(1, 'User ID is required'),
  }),
});

const getUserByIdSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'User ID is required'),
  }),
});

const listUsersSchema = z.object({
  query: z.object({
    page: z.string().regex(/^\d+$/).optional(),
    limit: z.string().regex(/^\d+$/).optional(),
    sort: z.string().optional(),
    search: z.string().optional(),
    role: z.enum(['user', 'admin']).optional(),
  }),
});

module.exports = {
  updateProfileSchema,
  updateUserRoleSchema,
  getUserByIdSchema,
  listUsersSchema,
};
