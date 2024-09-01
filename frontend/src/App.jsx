import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/home/HomePage';
import Movies from './pages/MoviesPage';
import TV from './pages/TvPage';
import Search from './pages/SearchPage';
import Login from './pages/LoginPage';
import SignUp from './pages/SignUpPage';
import NotFound from './pages/NotFoundPage';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import { useAuthStore } from './store/auth.store.js';

function App() {
  const { checkAuth, isCheckingAuth, user } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv" element={<TV />} />
        <Route path="/search" element={<Search />} />

        {/* Add a route for the login page */}
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />

        {/* Add a route for the registration page */}
        <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/" />} />

        {/* Add more routes as needed */}
        {/* <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} /> */}

        {/* Add a route for the 404 page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
