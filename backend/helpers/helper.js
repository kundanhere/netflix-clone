import bcrypt from "bcryptjs";

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

// Logic to hash the password using a secure hashing algorithm
export const hashPassword = async (password) => {
  // generate a salt
  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  // hash the password using our new salt
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};
