import { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogOut, Menu, Search } from 'lucide-react';

import Logo from './SiteLogo';
import { useAuthStore } from '../store/auth.store.js';
import { useContentStore } from '../store/content.store.js';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const { user, logout } = useAuthStore();
  const { setContentType } = useContentStore();

  return (
    <header className="max-w-6xl mx-auto flex flex-wrap items-center justify-between p-4 h-20">
      <div className="flex item-center gap-10 z-50">
        <Logo />
        {/* Desktop nav items */}
        <div className="hidden sm:flex gap-4 items-center text-xl">
          <Link to="/" className="text-white hover:text-gray-400" onClick={() => setContentType('movie')}>
            Movies
          </Link>
          <Link to="/" className="text-white hover:text-gray-400" onClick={() => setContentType('tv')}>
            TV Series
          </Link>
          <Link to="/history" className="text-white hover:text-gray-400">
            Search History
          </Link>
        </div>
      </div>

      {/* common nav links */}
      <div className="flex gap-4 items-center z-50">
        <Link to="/search">
          <Search className="size-6 cursor-pointer hover:text-gray-400" />
        </Link>
        <img src={user.profilePic} alt="Profile pic" className="h-8 rounded cursor-pointer hover:opacity-80" />
        <LogOut className="size-6 cursor-pointer hover:text-gray-400" onClick={logout} />
        <div className="sm:hidden">
          <Menu className="size-6 cursor-pointer hover:text-gray-400" onClick={toggleMenu} />
        </div>
      </div>

      {/* Mobile menu items */}
      {isMenuOpen && (
        <div className="w-full mt-4 z-50 text-base bg-black border border-gray-800 rounded sm:hidden">
          <Link to="/" className="block text-white hover:text-gray-400" onClick={() => setContentType('movie')}>
            Movies
          </Link>
          <Link to="/" className="block text-white hover:text-gray-400" onClick={() => setContentType('tv')}>
            TV Series
          </Link>
          <Link to="/history" className="block text-white hover:text-gray-400">
            Search History
          </Link>
        </div>
      )}
    </header>
  );
};

export default Navbar;
