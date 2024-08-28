/**
 * This module sets up the routes for the TV endpoints.
 * It uses Express Router to define the routes and maps them to the corresponding controller functions.
 * Like: Trailers, Details, Popular, Trendings, Upcoming, and Top rated tv-show.
 *
 * @module routes/tv
 * @requires express
 * @requires controllers/tv.controller
 */
import express from 'express';
import {
  getTrendingTvShow,
  getSimilarTvShows,
  getTvShowTrailers,
  getTvShowDetails,
  getTvShowByCategory,
} from '../controllers/tv.controller.js';

/**
 * Express Router instance for handling TV routes.
 */
const router = express.Router();

/**
 * GET request handler for retrieving trending TvShow.
 *
 * @method GET
 * @route /api/v1/tv/trending
 */
router.get('/trending', getTrendingTvShow);

/**
 * GET request handler for retrieving TvShow trailers.
 *
 * @method GET
 * @route /api/v1/tv/:id/trailers
 */
router.get('/:id/trailers', getTvShowTrailers);

/**
 * GET request handler for retrieving TvShow details.
 *
 * @method GET
 * @route /api/v1/tv/:id/details
 */
router.get('/:id/details', getTvShowDetails);

/**
 * GET request handler for retrieving similar TvShows.
 *
 * @method GET
 * @route /api/v1/tv/:id/similar
 */
router.get('/:id/similar', getSimilarTvShows);

/**
 * GET request handler for retrieving TvShows by category.
 *
 * @method GET
 * @route /api/v1/tv/:category
 */
router.get('/:category', getTvShowByCategory);

/**
 * Export the Express Router instance for TV routes.
 */
export default router;
