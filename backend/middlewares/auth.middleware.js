import JWT from 'jsonwebtoken';
import { ENV_VARS } from '../config/env.config.js';

/**
 * Middleware function to verify and authenticate a JWT token.
 *
 * @param {Object} req - The request object containing the authentication token in cookies.
 * @param {Object} res - The response object to send back the appropriate HTTP response.
 * @param {Function} next - The next middleware function in the request-response cycle.
 *
 * @returns {Object} - If the token is valid, attaches the user's ID to the request and calls the next function.
 *                      If the token is not provided, returns an unauthorized response with a message.
 *                      If the token is invalid or expired, returns an unauthorized response with a message.
 *                      If an error occurs during token verification, returns an internal server error response.
 */
export const verifyToken = async (req, res, next) => {
  // Extract the authentication token from the cookie
  const token = req.cookies.netflixToken;

  // If no token is present, return an unauthorized response
  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized - token not provided' });
  }

  // Verify the token using the JWT secret
  try {
    const decoded = JWT.verify(token, ENV_VARS.JWT_SECRET);

    // If the token is invalid, return an unauthorized response
    if (!decoded) return res.status(401).json({ success: false, message: 'Unauthorized - invalid token' });

    // If the token is expired, return an unauthorized response
    if (decoded.exp < Date.now() / 1000) {
      return res.status(401).json({ success: false, message: 'Unauthorized - token expired' });
    }

    // If the token is valid, attach the user's ID to the request and call the next function
    req.userId = decoded.payload;

    next();
  } catch (error) {
    // If the token verification fails, return an error response
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
