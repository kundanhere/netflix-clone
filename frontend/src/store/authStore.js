import { create } from "zustand";
import axios from "axios";

axios.defaults.withCredentials = true;
const BASE_URL = "http://localhost:8000/api/v1/account";

export const useAuthStore = create((set) => ({
  user: null,
  error: null,
  isLoading: false,
  isAuthenticated: false,
  isCheckingAuth: true,

  signup: async (username, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${BASE_URL}/signup`, {
        username,
        email,
        password,
      });
      set({
        user: response.data.user,
        error: null,
        isLoading: false,
        isAuthenticated: true,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error signing up",
        isLoading: false,
      });
      throw error;
    }
  },
  login: async () => {},
  logout: async () => {},
}));
