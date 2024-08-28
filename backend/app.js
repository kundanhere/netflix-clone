import express from 'express';
import cookieParser from 'cookie-parser';

import { ENV_VARS } from './config/env.config.js';
import { connectDB } from './config/db.config.js';
import { protectedRoute } from './middlewares/protectedRoute.js';
import authRoutes from './routes/auth.route.js';
import movieRoutes from './routes/movie.route.js';
import tvRoutes from './routes/tv.route.js';
import searchRoutes from './routes/search.route.js';

/**
 * Initializes and configures the Express application instance.
 *
 * @returns {express.Application} - The configured Express application instance.
 */
const app = express();

/**
 * Uses express.json() middleware to parse incoming JSON requests
 * and make them available on req.body.
 */
app.use(express.json());

/**
 * Uses cookieParser() middleware to parse incoming cookie headers
 * and make them available on req.cookies.
 */
app.use(cookieParser());

/**
 * Defines routes for the '/api/v1/account' , '/api/v1/movie' , '/api/v1/tv' , /api/v1/search' path.
 *
 * @param {express.Router} authRoutes - The imported Express Router instance for handling account-related routes.
 * @param {express.Router} movieRoutes - The imported Express Router instance for handling movie-related routes.
 * @param {express.Router} tvRoutes - The imported Express Router instance for handling TV show-related routes.
 * @param {express.Router} searchRoutes - The imported Express Router instance for handling search-related routes.
 */
app.use('/api/v1/account', authRoutes);
app.use('/api/v1/movie', protectedRoute, movieRoutes);
app.use('/api/v1/tv', protectedRoute, tvRoutes);
app.use('/api/v1/search', protectedRoute, searchRoutes);

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
  console.log(`➜  Local:   http://localhost:${PORT}`);
  connectDB();
});
