import { Routes, Route } from 'react-router-dom';

import Home from './pages/HomePage';
import Movies from './pages/MoviesPage';
import TV from './pages/TvPage';
import Search from './pages/SearchPage';
import Login from './pages/LoginPage';
import SignUp from './pages/SignUpPage';
import NotFound from './pages/NotFoundPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/movies" element={<Movies />} />
      <Route path="/tv" element={<TV />} />
      <Route path="/search" element={<Search />} />

      {/* Add a route for the login page */}
      <Route path="/login" element={<Login />} />

      {/* Add a route for the registration page */}
      <Route path="/signup" element={<SignUp />} />

      {/* Add more routes as needed */}
      {/* <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} /> */}

      {/* Add a route for the 404 page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
