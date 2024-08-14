import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

export const ENV_VARS = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.SERVER_PORT || 8000,
  NODE_ENV: process.env.NODE_ENV,
  JWT_SECRET: process.env.JWT_SECRET,
  TMDB_API_KEY: process.env.TMDB_API_KEY,
};
