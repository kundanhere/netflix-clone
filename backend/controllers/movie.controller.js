import { fetchFromTMDB } from '../services/tmdb.service.js';

/**
 * Fetches a random trending movie from The Movie Database (TMDB) and returns it.
 *
 * Resolves with a JSON response containing the random trending movie.
 * If an error occurs during the process, it sends a JSON response with a 500 status code and an error message.
 */
export const getTrendingMovie = async (req, res) => {
  try {
    const data = await fetchFromTMDB('https://api.themoviedb.org/3/trending/movie/day?language=en-US');
    const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)];

    res.status(200).json({ success: true, content: randomMovie });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' + error.message });
  }
};

/**
 * Retrieves movie trailers from The Movie Database (TMDB) based on the provided movie ID.
 *
 * Returns a Promise that resolves with a JSON response containing the movie trailers.
 * if the movie with the given ID is not found, it sends a JSON response with a 404 status code.
 * If an error occurs during the process, it sends a JSON response with a 500 status code and an error message.
 */
export const getMovieTrailers = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?&language=en-US`);

    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    if (error.message.includes('404')) return res.status(404).json({ success: false, message: 'Not Found' });

    res.status(500).json({ success: false, message: 'Internal server error' + error.message });
  }
};

/**
 * Fetches movie details from The Movie Database (TMDB) API.
 *
 * Will throw an error if the movie with the given ID is not found (404 status code).
 * Will throw an error if there is an internal server error (500 status code).
 */
export const getMovieDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);

    res.status(200).json({ success: true, content: data });
  } catch (error) {
    if (error.message.includes('404')) return res.status(404).json({ success: false, message: 'Not Found' });

    res.status(500).json({ success: false, message: 'Internal server error' + error.message });
  }
};

/**
 * Fetches a list of similar movies for the provided movie ID from The Movie Database (TMDB).
 *
 * Returns a Promise that resolves with a JSON response containing a list of similar movies.
 * If an error occurs during the process, it sends a JSON response with a 500 status code and an error message.
 */
export const getSimilarMovies = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`);

    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' + error.message });
  }
};

/**
 * Fetches a list of popular, upcoming and top-rated movies from The Movie Database (TMDB) for a given genre.
 * Returns a Promise that resolves with a JSON response containing a list of movies by category.
 */
export const getMoviesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`);

    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' + error.message });
  }
};
