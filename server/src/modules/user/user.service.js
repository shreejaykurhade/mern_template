const UserRepository = require('./user.repository');
const ApiError = require('../../utils/ApiError');
const { cacheWrapper, invalidateCache } = require('../../config/redis');

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async getUserById(userId) {
    return cacheWrapper(`user:${userId}`, 300, async () => {
      const user = await this.userRepository.findById(userId);
      if (!user) throw ApiError.notFound('User not found');
      return user;
    });
  }

  async getAllUsers(queryParams) {
    return this.userRepository.findAll(queryParams, { isActive: true });
  }

  async updateUser(userId, updateData) {
    // Prevent role escalation from this endpoint
    delete updateData.role;
    delete updateData.password;
    delete updateData.refreshToken;

    const user = await this.userRepository.updateById(userId, updateData);
    if (!user) throw ApiError.notFound('User not found');

    // Invalidate cache
    await invalidateCache(`user:${userId}`);

    return user;
  }

  async deleteUser(userId) {
    const user = await this.userRepository.findById(userId);
    if (!user) throw ApiError.notFound('User not found');

    await this.userRepository.deleteById(userId);
    await invalidateCache(`user:${userId}`);

    return { message: 'User deleted successfully' };
  }

  async updateUserRole(userId, role) {
    const user = await this.userRepository.updateById(userId, { role });
    if (!user) throw ApiError.notFound('User not found');

    await invalidateCache(`user:${userId}`);
    return user;
  }

  async deactivateUser(userId) {
    const user = await this.userRepository.updateById(userId, { isActive: false });
    if (!user) throw ApiError.notFound('User not found');

    await invalidateCache(`user:${userId}`);
    return user;
  }
}

module.exports = new UserService();
