import { useEffect, useState } from 'react';
import { CircleOff, Trash } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

import Navbar from '../components/Navbar';
import { formatDate } from '../utils/formatDate.js';
import { SMALL_IMG_BASE_URL } from '../utils/constants.js';

const SearchHistoryPage = () => {
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    // Fetch search history data from the backend API
    const getSearchHistory = async () => {
      try {
        const res = await axios.get('api/v1/search/history');
        if (res.data) setSearchHistory(res.data.content.searchHistory);
      } catch (error) {
        setSearchHistory([]);
      }
    };
    getSearchHistory();
  }, []);

  const handleDelete = async (entry) => {
    try {
      await axios.delete(`/api/v1/search/history/${entry.id}`);
      setSearchHistory(searchHistory.filter((item) => item.id !== entry.id));
    } catch (error) {
      toast.error('Failed to delete search item');
    }
  };

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-4">Search History</h1>
        {searchHistory?.length === 0 ? (
          <div className="flex justify-center items-center h-96">
            <p className="text-xl">No search history found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3  gap-4">
            {searchHistory?.map((entry) => (
              <div key={entry.id} className="bg-gray-800 p-4 rounded-xl flex items-center justify-start relative">
                {entry.image === null ? (
                  <div className="size-16 rounded-full flex justify-center items-center mr-4 bg-black/50">
                    <CircleOff className="text-red-400" />
                  </div>
                ) : (
                  <img
                    src={SMALL_IMG_BASE_URL + entry.image}
                    alt="History image"
                    className="size-16 rounded-full object-cover mr-4"
                  />
                )}
                <div className="flex flex-col items-start gap-1">
                  <span
                    className={`py-1 px-3 w-fit text-center rounded-full text-xs ${
                      entry.searchType === 'movie'
                        ? 'bg-red-800'
                        : entry.searchType === 'tv'
                          ? 'bg-blue-800'
                          : 'bg-green-800'
                    }`}
                  >
                    {entry.searchType[0].toUpperCase() + entry.searchType.slice(1)}
                  </span>
                  <span className="text-white text-sm overflow-hidden truncate text-balance">{entry.name}</span>
                  <span className="text-gray-400 text-xs">{formatDate(entry.createdAt)}</span>
                </div>
                <Trash
                  className="size-5 absolute right-4 top-4 cursor-pointer hover:text-red-400"
                  onClick={() => handleDelete(entry)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchHistoryPage;
