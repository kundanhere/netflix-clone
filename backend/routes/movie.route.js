/**
 * This module sets up the routes for the movie endpoints.
 * It uses Express Router to define the routes and maps them to the corresponding controller functions.
 * Like: Trailers, Details, Popular, Trendings, Upcoming, and Top rated movies.
 *
 * @module routes/movie
 * @requires express
 * @requires controllers/movie.controller
 */
import express from 'express';
import {
  getTrendingMovie,
  getSimilarMovies,
  getMovieTrailers,
  getMovieDetails,
  getMoviesByCategory,
} from '../controllers/movie.controller.js';

/**
 * Express Router instance for handling movie routes.
 */
const router = express.Router();

/**
 * GET request handler for retrieving trending movies.
 *
 * @method GET
 * @route /api/v1/movie/trending
 */
router.get('/trending', getTrendingMovie);

/**
 * GET request handler for retrieving movie trailers.
 *
 * @method GET
 * @route /api/v1/movie/:id/trailers
 */
router.get('/:id/trailers', getMovieTrailers);

/**
 * GET request handler for retrieving movie details.
 *
 * @method GET
 * @route /api/v1/movie/:id/details
 */
router.get('/:id/details', getMovieDetails);

/**
 * GET request handler for retrieving similar movies.
 *
 * @method GET
 * @route /api/v1/movie/:id/similar
 */
router.get('/:id/similar', getSimilarMovies);

/**
 * GET request handler for retrieving movies by category.
 *
 * @method GET
 * @route /api/v1/movie/:category
 */
router.get('/:category', getMoviesByCategory);

/**
 * Export the Express Router instance for movie routes.
 */
export default router;
