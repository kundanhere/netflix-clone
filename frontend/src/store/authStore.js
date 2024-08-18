import { create } from "zustand";
import axios from "axios";

// Set axios to send cookies with requests.
axios.defaults.withCredentials = true;

// Base URL for API requests.
const BASE_URL = "http://localhost:8000/api/v1/account";

export const useAuthStore = create((set) => ({
  user: null,
  error: null,
  isLoading: false,
  isAuthenticated: false,
  isCheckingAuth: true,

  /**
   * Signs up a new user with the provided username, email, and password.
   */
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

  /**
   * Logs in the user with the provided credentials.
   */
  login: async () => {},

  /**
   * Logs out the current user.
   *
   * This function sends a request to the server to log out the user.
   * It clears the user data from the store and sets the authentication status to false.
   */
  logout: async () => {},

  /**
   * Verifies the user's email using the provided verification code.
   * code - The verification code sent to the user's email.
   */
  verifyEmail: async (code) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${BASE_URL}/verify/email`, { code });
      set({
        user: response.data.user,
        isLoading: false,
        isAuthenticated: true,
      });
      return response.data;
    } catch (error) {
      set({
        error: error.response.data.message || "Error verifying email",
        isLoading: false,
      });
      throw error;
    }
  },

  /**
   * Checks the user's authentication status by making a request to the server.
   *
   * If the user is authenticated, it updates the store with the user's data and sets the authentication status to true.
   * If the user is not authenticated, it clears the user data from the store and sets the authentication status to false.
   *
   */
  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = axios.get(`${BASE_URL}/auth`);
      set({
        user: response.data.user,
        isCheckingAuth: false,
        isAuthenticated: true,
      });
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
    }
  },
}));
