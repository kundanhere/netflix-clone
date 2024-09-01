import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { login } = useAuthStore();

  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password });
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
          <h1 className="text-white text-4xl font-bold mb-4">Sign In</h1>
          <form className="space-y-4" onSubmit={handleLogin}>
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
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-4 mt-1 border border-gray-500 rounded-md bg-transparent text-white focus:outline-none focus:ring"
            />
            <button className="w-full py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700">
              Sign In
            </button>
          </form>
          <div className="text-center text-gray-400">
            Don&apos;t have an Account?{' '}
            <Link to="/signup" className="text-red-500 hover:underline">
              Sign up now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
