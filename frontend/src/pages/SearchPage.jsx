import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';

import Navbar from '../components/Navbar';
import { useContentStore } from '../store/content.store.js';
import { ORIGIN_IMG_BASE_URL } from '../utils/constants.js';

const SearchPage = () => {
  const [activeTab, setActiveTab] = useState('movie');
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const { setContentType } = useContentStore();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    tab === 'movie' ? setContentType('movie') : setContentType('tv');
    setSearchTerm('');
    setResults([]);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`/api/v1/search/${activeTab}/${searchTerm}`);
      setResults(res.data.content);
    } catch (error) {
      if (error.response.status === 404) {
        toast(
          (t) => (
            <span className="flex justify-between items-center">
              <span>
                <b>Nothing Found!</b>
                <br />
                Make sure you are searching under the right category.
              </span>
              <button
                className="ml-2 py-2 h-fit rounded-md px-4 border bg-[#424242] text-[#F5F5F5] hover:bg-[#616161]"
                onClick={() => toast.dismiss(t.id)}
              >
                Dismiss
              </button>
            </span>
          ),
          {
            duration: 6000,
            icon: '⚠️',
            style: {
              borderRadius: '12px',
              background: '#212121',
              color: '#fff',
            },
          }
        );
      } else {
        toast.error('Failed to search');
      }
    }
  };

  return (
    <div className="text-white bg-black min-h-screen">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center gap-3 mb-4">
          <button
            className={`text-white py-2 px-4 rounded-lg transition-colors duration-200 ease-in-out ${activeTab === 'movie' ? 'bg-red-600' : 'bg-gray-500/70'} hover:bg-red-700`}
            onClick={() => handleTabChange('movie')}
          >
            Movies
          </button>
          <button
            className={`text-white py-2 px-4 rounded-lg transition-colors duration-200 ease-in-out ${activeTab === 'tv' ? 'bg-red-600' : 'bg-gray-500/70'} hover:bg-red-700`}
            onClick={() => handleTabChange('tv')}
          >
            TV Shows
          </button>
          <button
            className={`text-white py-2 px-4 rounded-lg transition-colors duration-200 ease-in-out ${activeTab === 'person' ? 'bg-red-600' : 'bg-gray-500/70'} hover:bg-red-700`}
            onClick={() => handleTabChange('person')}
          >
            Person
          </button>
        </div>
        <form className="flex items-stretch mb-8 max-w-2xl mx-auto relative" onSubmit={handleSearch}>
          <input
            type="text"
            name="search"
            value={searchTerm}
            placeholder={'Search for a ' + activeTab}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg bg-gray-800/70 text-white"
          />
          <button className="absolute right-0 text-white py-2 px-4 rounded-e-lg transition-colors duration-200 ease-in-out bg-gray-800 hover:bg-red-700">
            <Search className="size-6" />
          </button>
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {results.map((result) => {
            if (!result.poster_path && !result.profile_path) return null;

            return (
              <div key={result.id} className="p-4 rounded-3xl">
                {activeTab === 'person' ? (
                  <div>
                    <div className="p-4 rounded-2xl h-96 group relative overflow-hidden ring-1 ring-inset ring-offset-0 ring-offset-white ring-[#454e5d80] ">
                      <Link
                        to={'/person/' + result.id}
                        onClick={() => {
                          setContentType(activeTab);
                        }}
                      >
                        <img
                          src={ORIGIN_IMG_BASE_URL + result.profile_path}
                          alt={result.name}
                          className="h-full w-full rounded-xl object-cover object-top relative z-20 shadow-2xl"
                        />
                        <img
                          src={ORIGIN_IMG_BASE_URL + result.profile_path}
                          alt={result.name}
                          aria-hidden="true"
                          className="h-96 w-full rounded-xl object-cover absolute top-2 left-1/2 -translate-x-1/2 blur-xl z-10"
                        />
                      </Link>
                    </div>
                    <h2 className="mt-2 text-lg font-semibold text-center">{result.name}</h2>
                  </div>
                ) : (
                  <div>
                    <div className="p-4 rounded-2xl h-96 group relative overflow-hidden ring-1 ring-inset ring-offset-0 ring-offset-white ring-[#454e5d80] ">
                      <Link
                        to={'/watch/' + result.id}
                        onClick={() => {
                          setContentType(activeTab);
                        }}
                      >
                        <img
                          src={ORIGIN_IMG_BASE_URL + result.poster_path}
                          alt={result.title || result.name}
                          className="h-full w-full rounded-xl object-cover object-top relative z-20 shadow-2xl"
                        />
                        <img
                          src={ORIGIN_IMG_BASE_URL + result.poster_path}
                          alt={result.title || result.name}
                          aria-hidden="true"
                          className="h-96 w-full rounded-xl object-cover absolute top-2 left-1/2 -translate-x-1/2 blur-xl z-10"
                        />
                      </Link>
                    </div>
                    <h2 className="mt-2 text-lg font-semibold">{result.title || result.name}</h2>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
