import { useState } from 'react';
import { Search } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

import Card from '../components/Card';
import Button from '../components/Button';
import Navbar from '../components/Navbar';
import CustomToast from '../components/CustomToast';
import { useContentStore } from '../store/content.store.js';

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState('movie');
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const { setContentType } = useContentStore();

  /**
   * Handles the tab change event in the search page.
   * Updates the active tab, content type, search term, and results.
   * tab - The tab to be set as active. It can be either 'movie', 'tv', or 'person'.
   */
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    tab === 'movie' ? setContentType('movie') : setContentType('tv');
    setSearchTerm('');
    setResults([]);
  };

  /**
   * Handles the search form submission event.
   * Makes an API request to search for movies or TV shows based on the selected tab and search term.
   * Updates the results state with the search results.
   */
  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
      setResults(res.data.content);
    } catch (error) {
      if (error.response.status === 404) {
        CustomToast({
          icon: '⚠️',
          title: 'No results found!',
          body: 'Make sure you are searching under the right category.',
        });
      } else {
        toast.error('Failed to search');
      }
    }
  };

  // Page Component
  return (
    <div className="text-white bg-black min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* type selector */}
        <div className="flex justify-center gap-3 mb-4">
          <Button
            className={activeTab === 'movie' ? 'bg-red-600' : 'bg-gray-500/70'}
            onClick={() => handleTabChange('movie')}
          >
            Movies
          </Button>
          <Button
            className={activeTab === 'tv' ? 'bg-red-600' : 'bg-gray-500/70'}
            onClick={() => handleTabChange('tv')}
          >
            TV Shows
          </Button>
          <Button
            className={activeTab === 'person' ? 'bg-red-600' : 'bg-gray-500/70'}
            onClick={() => handleTabChange('person')}
          >
            Person
          </Button>
        </div>

        {/* search bar */}
        <form className="flex items-stretch mb-8 max-w-2xl mx-auto relative" onSubmit={handleSearch}>
          <input
            type="text"
            name="search"
            value={searchTerm}
            placeholder={'Search for a ' + activeTab}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-800/70 text-white"
          />
          <Button className="absolute right-0 rounded-s-none bg-gray-800 hover:bg-red-700">
            <Search className="size-6" />
          </Button>
        </form>

        {/* display Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 md:gap-x-4 md:gap-y-8 md:px-4">
          {results.map((result) =>
            !result.poster_path && !result.profile_path ? null : (
              <div key={result.id} className="rounded-3xl">
                <Card data={result} type={activeTab} onClick={() => setContentType(activeTab)} />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
