import { create } from "zustand";
import axios from "axios";

// Set axios to send cookies with requests.
axios.defaults.withCredentials = true;

// Base URL for API requests.
const BASE_URL = "http://localhost:8000/api/v1/account";

export const useAuthStore = create((set) => ({
  user: null,
  error: null,
  message: null,
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
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${BASE_URL}/login`, {
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
        error: error.response.data.message || "Error logging in",
        isLoading: false,
      });
      throw error;
    }
  },

  /**
   * Logs out the current user.
   *
   * This function sends a request to the server to log out the user.
   * It clears the user data from the store and sets the authentication status to false.
   */
  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axios.post(`${BASE_URL}/logout`);
      set({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      });
    } catch (error) {
      set({ error: "Error logging out", isLoading: false });
      throw error;
    }
  },

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
    // Simulate a delay for demonstration purposes (2 seconds) before checking authentication status.
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axios.get(`${BASE_URL}/auth`);
      set({
        user: response.data.user,
        isCheckingAuth: false,
        isAuthenticated: true,
      });
    } catch (error) {
      set({ error: null, isCheckingAuth: false, isAuthenticated: false });
    }
  },

  /**
   * Sends a password reset email to the provided email address.
   *
   * This function makes a POST request to the server's forgot password endpoint.
   * If the email address is valid, the server sends a password reset email to the user.
   * The function updates the store's loading state, error message, and success message accordingly.
   *
   * @param {string} email - The email address of the user who requested the password reset.
   * @returns {Promise<void>} - A promise that resolves when the password reset email is sent successfully.
   * @throws {Error} - Throws an error if the request fails or if the server returns an error message.
   */
  forgotPassword: async (email) => {
    set({ isLoading: true, error: null, message: null });
    try {
      const response = await axios.post(`${BASE_URL}/forgot/password`, {
        email,
      });
      set({ isLoading: false, message: response.data.message });
    } catch (error) {
      set({
        error:
          error.response.data.message || "Error sending password reset email",
        isLoading: false,
      });
      throw error;
    }
  },

  /**
   * Resets the user's password using the provided reset token and new password.
   *
   * This function makes a POST request to the server's reset password endpoint.
   * If the reset token is valid and the new password is provided, the server resets the user's password.
   */
  resetPassword: async (resetToken, newPassword) => {
    set({ isLoading: true, error: null, message: "Resetting password" });
    try {
      const response = await axios.post(
        `${BASE_URL}/reset/password/${resetToken}`,
        { password: newPassword },
      );
      set({ isLoading: false, error: null, message: response.data.message });
    } catch (error) {
      set({
        error: error.response.data.message || "Error resetting password",
        isLoading: false,
      });
      throw error;
    }
  },
}));
