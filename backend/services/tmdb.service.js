import axios from 'axios';
import { ENV_VARS } from '../config/env.config.js';

/**
 * Fetches data from The Movie Database (TMDB) using the provided URL and API key.
 *
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<Object>} - A promise that resolves to the fetched data.
 *
 * @throws Will throw an error if the request fails or if the response status is not 2xx.
 *
 * @example
 * const movieData = await fetchFromTMDB('https://api.themoviedb.org/3/movie/550');
 * console.log(movieData);
 */
export const fetchFromTMDB = async (url) => {
  // 1. Set the headers for the GET request to TMDB API.
  // Include the required 'Authorization' header with the API key.
  const options = {
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer ' + ENV_VARS.TMDB_API_KEY,
    },
  };

  // 2. Make the GET request to the provided URL with the specified headers
  const response = await axios.get(url, options);

  // 3. Check if there was an error during the request & response status is not 2xx
  if (response.status !== 200) {
    throw new Error('Failed to fetch data from TMDB' + response.statusText);
  }

  // return the fetched data as JSON object
  return response.data;
};
