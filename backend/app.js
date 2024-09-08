import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';

import { ENV_VARS } from './config/env.config.js';
import { connectDB } from './config/db.config.js';
import { getClientUrl } from './helpers/helper.js';
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
 * Sets up environment variables from the.env file.
 * This should be done before any other imports or setup.
 */
const __dirname = path.resolve();

/**
 * Configures and applies the CORS middleware to the Express application instance.
 * getClientUrl is a function that retrieves the client's base URL. (e.g. http://localhost:5173)
 */
const baseURL = getClientUrl();
app.use(
  cors({
    origin: baseURL,
    methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'UPDATE', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

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
 * Serves the production build of the frontend if the NODE_ENV environment variable is set to "production".
 */
if (ENV_VARS.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
  });
}

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
