import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

export const ENV_VARS = {
  // APP configuration
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.SERVER_PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || "development",

  // JWT configuration
  JWT_SECRET: process.env.JWT_SECRET,

  // TMDB API configuration
  TMDB_API_KEY: process.env.TMDB_API_KEY,

  // Mailtrap SMTP configuration
  MAILTRAP_TOKEN: process.env.MAILTRAP_TOKEN,
  MAILTRAP_ENDPOINT: process.env.MAILTRAP_ENDPOINT,
};
