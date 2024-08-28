import { fetchFromTMDB } from '../services/tmdb.service.js';
import User from '../models/user.model.js';

/**
 * Saves search results to the user's profile in the database.
 *
 * @param {string} type - The type of search (e.g., 'person', 'movie', 'tv').
 * @param {string} userId - The ID of the user performing the search.
 * @param {Object} data - The search results data.
 *
 * @returns {Promise} - A promise that resolves when the search results are saved.
 */
async function saveSearchResults(type, userId, id, name, image) {
  try {
    const history = await User.findById(userId).select('searchHistory');

    // Check if search result already exists in the user's profile
    const hasData = history?.searchHistory.find((searchResult) => searchResult.id === id);
    if (hasData) return;

    // Save search result in the user's profile in the database
    await User.findByIdAndUpdate(userId, {
      $push: {
        searchHistory: {
          id: id,
          name: name,
          image: image,
          searchType: type,
          createdAt: new Date(),
        },
      },
    });
  } catch (error) {
    throw Error('An error occurred while saving search results in database:', error.message);
  }
}

// Search for people by name
export const searchPerson = async (req, res) => {
  try {
    const { query } = req.params;
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/person?query=${query}&language=en-US&page=1`
    );

    // Check if no results found in the database return empty string with no results
    if (response.results.length == 0) return res.status(404).json({ success: false, message: 'Not Found' });

    // Save search results in the database
    const { id, name, profile_path } = response.results[0];
    await saveSearchResults('person', req.user._id, id, name, profile_path);

    // Return the search results
    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.error('An error occurred in serach controller:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' + error.message });
  }
};

// Search for movies by title
export const searchMovie = async (req, res) => {
  try {
    const { query } = req.params;
    const response = await fetchFromTMDB(
      `https://api.themoviedb.org/3/search/movie?query=${query}&language=en-US&page=1`
    );

    // Check if no results found in the database return empty string with no results
    if (response.results.length == 0) return res.status(404).json({ success: false, message: 'Not Found' });

    // Save search results in the database
    const { id, title, poster_path } = response.results[0];
    await saveSearchResults('movie', req.user._id, id, title, poster_path);

    // Return the search results
    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.error('An error occurred in serach controller:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' + error.message });
  }
};

// Search for TV shows by title
export const searchTvShow = async (req, res) => {
  try {
    const { query } = req.params;
    const response = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?query=${query}&language=en-US&page=1`);

    // Check if no results found in the database return empty string with no results
    if (response.results.length == 0) return res.status(404).json({ success: false, message: 'Not Found' });

    // Save search results in the database
    const { id, name, poster_path } = response.results[0];
    await saveSearchResults('tv', req.user._id, id, name, poster_path);

    // Return the search results
    res.status(200).json({ success: true, content: response.results });
  } catch (error) {
    console.error('An error occurred in serach controller:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' + error.message });
  }
};

// Get the search history
export const getSearchHistory = async (req, res) => {
  try {
    const searchHistory = await User.findById(req.user._id).select('searchHistory');

    // Check if the user has no search history in the database return empty string with no results
    if (!searchHistory) return res.status(404).json({ success: false, message: 'Not Found' });

    // Return the search history
    res.status(200).json({ success: true, content: searchHistory });
  } catch (error) {
    console.error('An error occurred in search controller:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' + error.message });
  }
};

// Remove a search result from the user's search history in the database
export const removeFromSearchHistory = async (req, res) => {
  try {
    let { id } = req.params;
    // Convert string ID to integer
    id = parseInt(id);

    // Remove the search result from the user's search history in the database
    // $pull operator removes the first document that matches the specified condition from the array field.
    // The search result is identified by its ID.
    await User.findByIdAndUpdate(req.user._id, {
      $pull: {
        searchHistory: { id: id },
      },
    });

    // Return success message
    res.status(200).json({ success: true, message: 'Search result removed from history' });
  } catch (error) {
    console.error('An error occurred in search controller:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' + error.message });
  }
};
