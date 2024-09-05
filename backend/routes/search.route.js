/**
 * This module sets up the routes for the search endpoints.
 * It uses Express Router to define the routes and maps them to the corresponding controller functions.
 * Like: Search Person, Movie and Tv-shows.
 *
 * @module routes/tv
 * @requires express
 * @requires controllers/tv.controller
 */
import express from 'express';
import {
  searchPerson,
  searchMovie,
  searchTvShow,
  getSearchHistory,
  removeFromSearchHistory,
} from '../controllers/search.controller.js';

/**
 * Express Router instance for handling search routes.
 */
const router = express.Router();

/**
 * GET request handler for search person details.
 *
 * @method GET
 * @route /api/v1/search/person/:query
 */
router.get('/person/:query', searchPerson);

/**
 * GET request handler for search movie.
 *
 * @method GET
 * @route /api/v1/search/movie/:query
 */
router.get('/movie/:query', searchMovie);

/**
 * GET request handler for search TvShow.
 *
 * @method GET
 * @route /api/v1/search/tv/:query
 */
router.get('/tv/:query', searchTvShow);

/**
 * GET request handler to get search history.
 *
 * @method GET
 * @route /api/v1/search/history
 */
router.get('/history', getSearchHistory);

/**
 * GET request handler to remove search history from the database.
 *
 * @method GET
 * @route /api/v1/search/history/:id
 */
router.delete('/history/:id', removeFromSearchHistory);

/**
 * Export the Express Router instance for search routes.
 */
export default router;
