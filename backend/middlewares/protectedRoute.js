import JWT from 'jsonwebtoken';
import User from '../models/user.model.js';
import { ENV_VARS } from '../config/env.config.js';

export const protectedRoute = async (req, res, next) => {
  try {
    // Extract the authentication token from the cookie
    const token = req.cookies.netflixToken;

    // If no token is present, return an unauthorized response
    if (!token) {
      return res.status(401).json({ success: false, message: 'Unauthorized - token not provided' });
    }

    const decoded = JWT.verify(token, ENV_VARS.JWT_SECRET);

    // If the token is invalid, return an unauthorized response
    if (!decoded) return res.status(401).json({ success: false, message: 'Unauthorized - invalid token' });

    // If the token is expired, return an unauthorized response
    if (decoded.exp < Date.now() / 1000) {
      return res.status(401).json({ success: false, message: 'Unauthorized - token expired' });
    }

    // If the token is valid, find user by id
    const user = await User.findById(decoded.payload).select('-password');

    // check if user exists then attach the user to the request and call the next function
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    req.user = user;
    next();
  } catch (error) {
    console.log('An error occurred in protectedRoute middleware:', error.message);
    // If the token verification fails, return an error response
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
};
