/**
 * Pagination, filtering, and sorting utility for Mongoose queries.
 *
 * Usage in service/repository:
 *   const result = await paginate(User, req.query, { role: 'user' });
 *
 * Query params supported:
 *   ?page=1&limit=10&sort=-createdAt&fields=name,email&search=john
 */

const paginate = async (Model, queryParams = {}, baseFilter = {}) => {
  const {
    page = 1,
    limit = 10,
    sort = '-createdAt',
    fields,
    search,
    searchFields = 'name,email', // default fields to search
    ...filters
  } = queryParams;

  const pageNum = Math.max(1, parseInt(page, 10));
  const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10)));
  const skip = (pageNum - 1) * limitNum;

  // Build filter object
  const filter = { ...baseFilter };

  // Apply additional query filters (e.g., ?role=admin&isActive=true)
  for (const [key, value] of Object.entries(filters)) {
    if (Model.schema.paths[key]) {
      filter[key] = value;
    }
  }

  // Full-text search across specified fields
  if (search && searchFields) {
    const searchFieldsArr = searchFields.split(',');
    filter.$or = searchFieldsArr.map((field) => ({
      [field]: { $regex: search, $options: 'i' },
    }));
  }

  // Build sort string (e.g., "-createdAt name" → sort by createdAt desc, then name asc)
  const sortStr = sort.split(',').join(' ');

  // Field selection
  const selectStr = fields ? fields.split(',').join(' ') : '-__v';

  // Execute query and count in parallel
  const [docs, total] = await Promise.all([
    Model.find(filter).sort(sortStr).select(selectStr).skip(skip).limit(limitNum).lean(),
    Model.countDocuments(filter),
  ]);

  return {
    docs,
    pagination: {
      total,
      page: pageNum,
      limit: limitNum,
      pages: Math.ceil(total / limitNum),
      hasNextPage: pageNum < Math.ceil(total / limitNum),
      hasPrevPage: pageNum > 1,
    },
  };
};

module.exports = { paginate };
