import api from './axios';

export const userApi = {
  getProfile: () => api.get('/users/me'),
  updateProfile: (data) => api.put('/users/me', data),

  // Admin endpoints
  getAllUsers: (params) => api.get('/users', { params }),
  getUserById: (id) => api.get(`/users/${id}`),
  updateUser: (id, data) => api.put(`/users/${id}`, data),
  updateUserRole: (id, role) => api.patch(`/users/${id}/role`, { role }),
  deactivateUser: (id) => api.patch(`/users/${id}/deactivate`),
  deleteUser: (id) => api.delete(`/users/${id}`),
};

export default userApi;
