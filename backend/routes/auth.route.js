/**
 * This module sets up the routes for the authentication endpoints.
 * It uses Express Router to define the routes and maps them to the corresponding controller functions.
 * Like: signup, login, logout, email verification, password reset, etc.
 *
 * @module routes/auth
 * @requires express
 * @requires controllers/auth.controller
 */

import express from "express";
import {
  login,
  signup,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";

/**
 * Express Router instance for handling authentication routes.
 */
const router = express.Router();

/**
 * POST request handler for user signup.
 *
 * @method POST
 * @route /api/v1/account/signup
 */
router.post("/signup", signup);

/**
 * POST request handler for user login.
 *
 * @method POST
 * @route /api/v1/account/login
 */
router.post("/login", login);

/**
 * POST request handler for user logout.
 *
 * @method POST
 * @route /api/v1/account/logout
 */
router.post("/logout", logout);

/**
 * POST request handler for verifying user email.
 *
 * @method POST
 * @route /api/v1/account/verify/email
 */
router.post("/verify/email", verifyEmail);

/**
 * POST request handler for sending password reset email.
 *
 * @method POST
 * @route /api/v1/account/forgot/password
 */
router.post("/forgot/password", forgotPassword);

/**
 * POST request handler for resetting user password.
 *
 * @method POST
 * @route /api/v1/account/reset/password/?token=123456
 */
router.post("/reset/password/:token", resetPassword);

/**
 * Export the Express Router instance for authentication routes.
 */
export default router;
