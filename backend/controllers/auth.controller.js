import User from "../models/user.model.js";
import {
  generateTokenAndSetCookie,
  generateVerificationToken,
} from "../helpers/helper.js";
import { sendVerificationEmail } from "../services/mailtrap.service.js";

// handle signup request
export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // validate request body fields and format data
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, meesage: "All fields are required" });
    }

    // validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, meesage: "Invalid email" });
    }

    // validate password
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long",
      });
    }

    // check if username already exists
    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res
        .status(400)
        .json({ success: false, meesage: "Username already exists" });
    }

    // check if email already exists
    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return res.status(400).json({
        success: false,
        meesage: "User with this email already exists",
      });
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

    // save user in database
    await newUser.save();

    // if user registered successfully then
    // create token and set token to cookie and return success message
    const token = generateTokenAndSetCookie(newUser._id, res);

    // remove password from the response
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        ...newUser._doc,
        password: undefined,
        accessToken: token,
      },
    });
  } catch (error) {
    // log error and return error message in response
    console.error("Error in signup controller", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  // code for login logic
  res.send("Login Route");
};

export const logout = async (req, res) => {
  // code for logout logic
  res.send("Logout Route");
};
