import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import {
  loginUser,
  registerUser,
  logoutUser,
  loadUser,
  clearError,
} from '../store/slices/authSlice';

/**
 * Custom hook for auth operations — provides clean API for components.
 */
export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, accessToken, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth,
  );

  const login = useCallback(
    (credentials) => dispatch(loginUser(credentials)),
    [dispatch],
  );

  const register = useCallback(
    (userData) => dispatch(registerUser(userData)),
    [dispatch],
  );

  const logout = useCallback(() => dispatch(logoutUser()), [dispatch]);

  const checkAuth = useCallback(() => dispatch(loadUser()), [dispatch]);

  const resetError = useCallback(() => dispatch(clearError()), [dispatch]);

  return {
    user,
    accessToken,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    checkAuth,
    resetError,
  };
};
