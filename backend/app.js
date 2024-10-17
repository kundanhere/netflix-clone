import cors from 'cors';
import cookieParser from 'cookie-parser';
import express from 'express';
import path from 'path';

import { ENV_VARS } from './config/env.config.js';
import { getClientUrl } from './helpers/helper.js';
import { protectedRoute } from './middlewares/protectedRoute.js';
import authRoutes from './routes/auth.route.js';
import movieRoutes from './routes/movie.route.js';
import tvRoutes from './routes/tv.route.js';
import searchRoutes from './routes/search.route.js';

/**
 * Resolves the absolute path of the current directory.
 * This is useful for resolving relative paths in the application,
 * especially when the application is deployed to a different directory.
 */
const __dirname = path.resolve();

/**
 * Creates and configures an Express application instance with the necessary middleware and routes.
 *
 * @returns {express.Application} The configured Express application instance
 */
export const expressServer = () => {
  // Creates an Express application instance.
  const app = express();

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

  // Defines routes for the '/api/v1/account' , '/api/v1/movie' , '/api/v1/tv' , /api/v1/search' path.
  app.use('/api/v1/account', authRoutes);
  app.use('/api/v1/movie', protectedRoute, movieRoutes);
  app.use('/api/v1/tv', protectedRoute, tvRoutes);
  app.use('/api/v1/search', protectedRoute, searchRoutes);

  // Serves the production build of the frontend if the NODE_ENV environment variable is set to "production".
  if (ENV_VARS.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'));
    });
  }

  return app;
};
