import mongoose from "mongoose";
import { generateProfilePicture, hashPassword } from "../helpers/helper.js";

/**
 * Defines a new schema for a user in the application.
 *
 * @typedef {mongoose.Schema} UserSchema
 * @property {string} username - The username of the user.
 * @property {string} email - The email of the user.
 * @property {string} password - The password of the user.
 * @property {boolean} isVerified - Indicates whether the user's email is verified.
 * @property {Date} lastLogin - The date and time of the user's last login.
 * @property {string} profilePic - The URL of the user's profile picture.
 * @property {Array} searchHistory - The user's search history.
 * @property {string} resetPasswordToken - The token used for password reset.
 * @property {Date} resetPasswordExpiresAt - The expiration date of the password reset token.
 * @property {string} verificationToken - The token used for email verification.
 * @property {Date} verificationExpiresAt - The expiration date of the email verification token.
 */

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      index: { unique: true },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
      default: Date.now,
    },
    profilePic: {
      type: String,
      default: generateProfilePicture,
    },
    searchHistory: {
      type: Array,
      default: [],
    },
    resetPasswordToken: String,
    resetPasswordExpiresAt: Date,
    verificationToken: String,
    verificationExpiresAt: Date,
  },
  {
    timestamps: true,
  },
);

/**
 * Hash the password before saving it to the database using mongoose Pre-hooks.
 * This function is executed before saving a user document.
 *
 * @param {mongoose.HookNextFunction} next - The next middleware function in the stack.
 * @returns {void}
 * @throws Will throw an error if hashing the password fails.
 */
userSchema.pre("save", async function (next) {
  // only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();

  try {
    const hashedPassword = await hashPassword(this.password);
    // override the cleartext password with the hashed one
    this.password = hashedPassword;
    return next();
  } catch (error) {
    return next(error);
  }
});

/**
 * Creates and exports a new Mongoose model using the provided user schema.
 *
 * @function
 * @param {mongoose.Schema} userSchema - The Mongoose schema to be used for creating the model.
 * @returns {mongoose.Model<mongoose.Document>} - The newly created Mongoose model.
 * @throws Will throw an error if the model creation fails.
 */
const User = mongoose.model("User", userSchema);

export default User;
