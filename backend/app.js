import express from "express";
import { ENV_VARS } from "./config/env.config.js";
import { connectDB } from "./config/db.config.js";
import authRoutes from "./routes/auth.route.js";

/**
 * Initializes and configures the Express application instance.
 *
 * @returns {express.Application} - The configured Express application instance.
 */
const app = express();

// Add middleware and routes to the Express application instance.

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

/**
 * Uses express.json() middleware to parse incoming JSON requests
 * and make them available on req.body.
 */
app.use(express.json());

/**
 * Defines a route for the '/api/v1/account' path using the imported authRoutes.
 *
 * @param {express.Router} authRoutes - The imported Express Router instance for handling account-related routes.
 */
app.use("/api/v1/account", authRoutes);

/**
 * Connects to MongoDB and starts the Express server.
 *
 * @param {number} PORT - The port number on which the server will listen.
 * @param {express.Application} app - The Express application instance.
 * @param {function} connectDB - The function to connect to MongoDB.
 */
const PORT = ENV_VARS.PORT;
app.listen(PORT, () => {
  console.log(`Server is up and running on port: ${PORT}`);
  connectDB();
});
