import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

import { useAuthStore } from '../store/auth.store.js';

const SignUpPage = () => {
  // Extract email from query parameters if provided
  const { searchParams } = new URL(document.location);
  const userEmail = searchParams.get('email');

  // Initialize state variables with email extracted from query parameters or an empty string
  const [email, setEmail] = useState(userEmail || '');

  // Initialize other state variables
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const { signup, error } = useAuthStore();

  const handleSignUp = (e) => {
    e.preventDefault();
    toast.promise(signup({ username, email, password }), {
      loading: 'Signing up...',
      success: <b>Signup successful!</b>,
      error: <b>Signup failed</b>,
    });
  };

  return (
    <div className="w-full h-screen hero-bg">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to="/">
          <img src="/netflix-logo.png" alt="app-logo" className="w-32 md:w-44" />
        </Link>
      </header>

      <div className="flex items-center justify-center mt-12 mx-3">
        <div className="w-full max-w-md px-16 py-10 space-y-6 bg-black/70 rounded-lg shadow-md">
          <h1 className="text-white text-4xl font-bold mb-4">Sign Up</h1>

          <form className="space-y-4" onSubmit={handleSignUp}>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              autoComplete="on"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-4 mt-1 border border-gray-500 rounded-md bg-transparent text-white focus:outline-none focus:ring"
            />
            <input
              type="text"
              id="username"
              placeholder="Username"
              autoComplete="on"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-4 mt-1 border border-gray-500 rounded-md bg-transparent text-white focus:outline-none focus:ring"
            />
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-4 mt-1 border border-gray-500 rounded-md bg-transparent text-white focus:outline-none focus:ring"
            />
            {error && <p className="text-red-500">{error}</p>}
            <button className="w-full py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700">
              Sign Up
            </button>
          </form>
          <div className="text-center text-gray-400">
            Already a member?{' '}
            <Link to="/login" className="text-red-500 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
