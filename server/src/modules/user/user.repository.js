const User = require('./user.model');
const { paginate } = require('../../utils/pagination');

/**
 * Repository pattern — all database operations for User go through here.
 * This abstracts Mongoose from the service layer, making the service testable
 * and the data layer swappable.
 */
class UserRepository {
  async create(data) {
    return User.create(data);
  }

  async findById(id) {
    return User.findById(id);
  }

  async findByIdWithPassword(id) {
    return User.findById(id).select('+password');
  }

  async findByEmail(email) {
    return User.findOne({ email });
  }

  async findByEmailWithPassword(email) {
    return User.findOne({ email }).select('+password');
  }

  async findByIdWithRefreshToken(id) {
    return User.findById(id).select('+refreshToken');
  }

  async updateById(id, data) {
    return User.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async deleteById(id) {
    return User.findByIdAndDelete(id);
  }

  async findAll(queryParams = {}, baseFilter = {}) {
    return paginate(User, queryParams, baseFilter);
  }

  async storeRefreshToken(userId, token) {
    return User.findByIdAndUpdate(userId, { refreshToken: token });
  }

  async clearRefreshToken(userId) {
    return User.findByIdAndUpdate(userId, { refreshToken: null });
  }

  async updateLastLogin(userId) {
    return User.findByIdAndUpdate(userId, { lastLogin: new Date() });
  }

  async countDocuments(filter = {}) {
    return User.countDocuments(filter);
  }
}

module.exports = UserRepository;
