import { create } from 'zustand';
import axios from 'axios';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
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
  login: async () => {},
  logout: async () => set({ user: null }),
  checkAuth: async () => {},
  verifyEmail: async () => {},
  forgotPassword: async () => {},
  resetPassword: async () => {},
}));
