import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { ENV_VARS } from '../config/env.config.js';

// Constants for helper functions
const PROILE_PICS = ['/avatar1.png', '/avatar2.png', '/avatar3.png'];
const SALT_WORK_FACTOR = 10;

/**
 * This function retrieves the current date and time in a specified format.
 *
 * @returns {string} The current date and time in the format: 'Last Sync: dd/mm/yyyy @ hh:mm:ss'.
 *
 * @example
 * const currentDateTime = getCurrentDateTime();
 * console.log(currentDateTime); // Output: 'Last Sync: 25/12/2022 @ 14:30:00'
 */
export const getCurrentDateTime = () => {
  const currentdate = new Date();
  const datetime =
    'Last Sync: ' +
    currentdate.getDate() +
    '/' +
    (currentdate.getMonth() + 1) +
    '/' +
    currentdate.getFullYear() +
    ' @ ' +
    currentdate.getHours() +
    ':' +
    currentdate.getMinutes() +
    ':' +
    currentdate.getSeconds();
  return datetime;
};

/**
 * This function generates a random profile picture URL from a predefined list.
 *
 * @returns {string} A randomly selected profile picture URL from the PROILE_PICS array.
 *
 * @example
 * const profilePicture = generateProfilePicture();
 * console.log(profilePicture); // Output: '/avatar2.png'
 */
export const generateProfilePicture = () => {
  const randomNumber = Math.floor(Math.random() * PROILE_PICS.length);
  return PROILE_PICS[randomNumber];
};

/**
 * This function generates a random verification token.
 *
 * @returns {string} A six-digit random number string used for user verification.
 *
 * @example
 * const verificationToken = generateVerificationToken();
 * console.log(verificationToken); // Output: '123456'
 */
export const generateVerificationToken = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * This function generates a JWT token and sets a cookie with the token.
 *
 * @param {Object} payload - The payload to be included in the JWT token.
 * @param {Object} res - The response object to set the cookie.
 *
 * @returns {string} The generated JWT token.
 *
 * @example
 * const payload = { userId: 123, email: 'user@example.com' };
 * const res = {
 *   cookie: (name, value, options) => {
 *     // Implementation to set the cookie
 *   }
 * };
 * const token = generateTokenAndSetCookie(payload, res);
 * console.log(token); // Output: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
 */
export const generateTokenAndSetCookie = (payload, res) => {
  // Generate a token
  const token = jwt.sign({ payload }, ENV_VARS.JWT_SECRET, { expiresIn: '7d' });

  // Set a cookie with the token
  let options = {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true, // secure cookie only accessible via HTTP, prevent XSS attacks cross-site scripting attacks, make it not be accessed by JS
    secure: ENV_VARS.NODE_ENV === 'production', // secure cookie only accessible over HTTPS (default is development)
    sameSite: 'strict', // prevent CSRF attacks cross-site request forgery attacks
  };
  res.cookie('netflixToken', token, options);

  return token;
};

/**
 * This function securely hashes a password using the bcrypt library.
 *
 * @param {string} password - The password to be hashed.
 *
 * @returns {Promise<string>} A promise that resolves to the hashed password.
 *
 * @example
 * const password = 'userPassword123';
 * hashPassword(password)
 *   .then((hashedPassword) => {
 *     console.log(hashedPassword); // Output: '$2b$10$...hashed password...'
 *   })
 *   .catch((error) => {
 *     console.error(error);
 *   });
 */
export const hashPassword = async (password) => {
  // Generate a salt
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  // Hash the password using our new salt
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

/**
 * This function constructs and returns the base URL for the client application based on the current environment.
 *
 * @returns {string} The base URL for the client application.
 *
 * @example
 * const clientUrl = getClientUrl();
 * console.log(clientUrl); // Output: 'http://localhost:5173' (or 'http://localhost:8000' in production)
 */
export const getClientUrl = () => {
  const { NODE_ENV, CLIENT_HOST, CLIENT_PORT, PORT } = ENV_VARS;
  return NODE_ENV === 'development' ? `http://${CLIENT_HOST}:${CLIENT_PORT}` : `http://${CLIENT_HOST}:${PORT}`;
};
