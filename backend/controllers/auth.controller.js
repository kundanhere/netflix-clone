import crypto from 'crypto';
import User from '../models/user.model.js';
import { ENV_VARS } from '../config/env.config.js';
import { generateTokenAndSetCookie, generateVerificationToken } from '../helpers/helper.js';
import {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
  sendPasswordResetSuccessEmail,
} from '../services/mailtrap.service.js';

/**
 * Handles the signup request by validating user input, checking for existing users,
 * generating a verification token, sending a verification email, creating a new user,
 * and returning a success message with the user's information.
 */
export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // validate request body fields and format data
    if (!username || !email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email' });
    }

    // validate password
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
    }

    // check if username already exists
    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res.status(400).json({ success: false, message: 'Username already exists' });
    }

    // check if email already exists
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({ success: false, message: 'User with this email already exists' });
    }

    // generate the token for email verification
    const verificationToken = generateVerificationToken();
    await sendVerificationEmail(email, verificationToken);

    // create new user and save to database
    const newUser = new User({
      username,
      email,
      password,
      verificationToken,
      verificationExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });
    await newUser.save();

    // if user registered successfully then
    // create token and set token to cookie and return success message
    const token = generateTokenAndSetCookie(newUser._id, res);

    // remove password from the response
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        ...newUser._doc,
        password: undefined,
        accessToken: token,
      },
    });
  } catch (error) {
    // log error and return error message in response
    console.error('Error in signup controller', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

/**
 * Handles the login request by validating user input, checking for existing users,
 * sending a verification email, and returning a success message with the user's information
 * if the credentials are valid.
 * @param {string} req.body.email - The email of the user trying to log in.
 * @param {string} req.body.password - The password of the user trying to log in.
 */
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // validate request body fields
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // check if password matches
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // if user logged in successfully then
    // create token and set token to cookie and return success message
    const token = generateTokenAndSetCookie(user._id, res);

    // update lastLogin field in the user document
    user.lastLogin = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      user: {
        ...user._doc,
        password: undefined, // remove password from the response body
        accessToken: token,
      },
    });
  } catch (error) {
    // log error and return error message in response
    console.error('Error in login controller', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

/**
 * Handles the logout request by invalidating the user's session and removing the
 * authentication token from the client's cookie.
 */
export const logout = async (req, res) => {
  res.clearCookie('netflixToken');
  res.status(200).json({ success: true, message: 'Logged out successfully' });
};

/**
 * Handles the email verification request by validating the user's email and
 * verificationToken, updating the user's account to verified, sending a welcome
 * email and returning a success message.
 */
export const verifyEmail = async (req, res) => {
  const { code } = req.body;

  try {
    const user = await User.findOne({
      verificationToken: code,
      verificationExpiresAt: { $gt: Date.now() },
    });

    // checks if user is valid
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid or expired verification code' });
    }

    // update user's account to verified
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationExpiresAt = undefined;
    await user.save();

    // send welcome email to the user, and send success message
    await sendWelcomeEmail(user.email, user.username);
    res.status(200).json({
      status: 'success',
      message: 'Account verified successfully',
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    // log error and return error message in response
    console.error('Error in logout controller', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

/**
 * Handles the password reset confirmation request by validating user input, updating
 * the user's password, and returning a success message.
 */
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // generate the token for password reset
    // and update user's resetToken and resetTokenExpiresAt fields
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = Date.now() + 2 + 60 * 60 * 1000; // 2 hours
    await user.save();

    // send password reset link to the user via email, and send success message
    const resetPasswordUrl = `${ENV_VARS.CLIENT_URL}/reset/password/${resetToken}`;

    await sendPasswordResetEmail(user.email, resetPasswordUrl);

    res.status(200).json({ success: true, message: 'Password reset link sent' });
  } catch (error) {
    // log error and return error message in response
    console.error('Error in forgot password controller', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

/**
 * Handles the password reset request by validating user input, sending a password reset
 * email with a unique reset token, and returning a success message.
 */
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // validate password
    if (password?.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters long' });
    }

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'Invalid or expired reset token' });
    }

    // update user's password and reset fields
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    await user.save();

    // send password reset success email to the user, and send success message
    await sendPasswordResetSuccessEmail(user.email);
    res.status(200).json({ success: true, message: 'Password reset successfully' });
  } catch (error) {
    // log error and return error message in response
    console.error('Error in reset password controller', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};

/**
 * Checks if the user is authenticated by validating the user's ID from the request.
 * If the user is authenticated, it retrieves the user's information from the database,
 * removes the password field, and returns the user information.
 * If the user is not authenticated, it returns a 401 Unauthorized response.
 *
 * @param {Object} req - The request object containing the user's ID in req.userId.
 * @param {Object} res - The response object to send the response.
 *
 * @returns {Object} - If the user is authenticated, it returns a 200 OK response with the user information.
 * If the user is not authenticated, it returns a 401 Unauthorized response.
 * If an error occurs, it returns a 500 Internal Server Error response.
 */
export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');

    // check if user exists
    if (!user) {
      return res.status(401).json({ success: false, message: 'User not found' });
    }

    // return user information if user is authenticated
    res.status(200).json({ success: true, user });
  } catch (error) {
    // log error and return error message in response
    console.error('Error in checkAuth controller', error.message);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
