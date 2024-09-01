import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isLoggingIn: false,
  isLoggingOut: false,
  isCheckingAuth: true,
  signup: async (credentials) => {
    set({ user: null, isSigningUp: true });
    try {
      const res = await axios.post('/api/v1/account/signup', credentials);
      set({ user: res.data.user, isSigningUp: false });
      toast.success(res.data.message || 'Signup successful');
    } catch (error) {
      set({ user: null, isSigningUp: false });
      toast.error(error.response.data.message || 'Signup failed');
    }
  },
  login: async (credentials) => {
    set({ user: null, isLoggingIn: true });
    try {
      const res = await axios.post('/api/v1/account/login', credentials);
      set({ user: res.data.user, isLoggingIn: false });
      toast.success(res.data.message || 'Logged in successfully');
    } catch (error) {
      set({ isLoggingIn: false });
      toast.error(error.response.data.message || 'Failed to login');
    }
  },
  logout: async () => {
    set({ isLoggingOut: true });
    try {
      await axios.post('/api/v1/account/logout');
      set({ user: null, isLoggingOut: false });
      toast.success('Logged out successfully');
    } catch (error) {
      set({ isLoggingOut: false });
      toast.error(error.response.data.message || 'Failed to logout');
    }
  },
  checkAuth: async () => {
    set({ user: null, isCheckingAuth: true });
    try {
      const res = await axios.get('/api/v1/account/auth');
      set({ user: res.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ user: null, isCheckingAuth: false });
    }
  },
  verifyEmail: async () => {},
  forgotPassword: async () => {},
  resetPassword: async () => {},
}));
