import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { ENV_VARS } from "../config/envVars.js";

// Constants for helper functions
const PROILE_PICS = ["/avatar1.png", "/avatar2.png", "/avatar3.png"];
const SALT_WORK_FACTOR = 10;

// Function to get current date and time in a specified format
export const getCurrentDateTime = () => {
  const currentdate = new Date();
  const datetime =
    "Last Sync: " +
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();
  return datetime;
};

// Logic to generate a random profile picture URL
export const generateProfilePicture = () => {
  const randomNumber = Math.floor(Math.random() * PROILE_PICS.length);
  return PROILE_PICS[randomNumber];
};

// Function to generate verification token
export const generateVerificationToken = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Function to generate token and set cookie
export const generateTokenAndSetCookie = (payload, res) => {
  // Generate a token
  const token = jwt.sign({ payload }, ENV_VARS.JWT_SECRET, { expiresIn: "7d" });
  // Set a cookie with the token
  res.cookie("netflix-token", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    httpOnly: true, // secure cookie only accessible via HTTP, prevent XSS attacks cross-site scripting attacks, make it not be accessed by JS
    secure: ENV_VARS.NODE_ENV === "production", // secure cookie only accessible over HTTPS (default is development)
    sameSite: "strict", // prevent CSRF attacks cross-site request forgery attacks
  });

  return token;
};

// Logic to hash the password using a secure hashing algorithm
export const hashPassword = async (password) => {
  // generate a salt
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  // hash the password using our new salt
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
