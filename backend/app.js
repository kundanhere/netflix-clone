import express from "express";
import { ENV_VARS } from "./config/env.config.js";
import { connectDB } from "./config/db.config.js";
import authRoutes from "./routes/auth.route.js";

// Create a new Express application instance
// and configure it to use the necessary middleware and routes.
const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Define app routes and Middlewares
app.use(express.json()); // it allows us to parse incoming JSON responses:-> req.body
app.use("/api/v1/account", authRoutes);

// Connect to MongoDB and Express server
const PORT = ENV_VARS.PORT;
app.listen(PORT, () => {
  console.log(`Server is up and running on port: ${PORT}`);
  connectDB();
});
