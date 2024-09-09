import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader, Lock, Mail } from 'lucide-react';
import toast from 'react-hot-toast';

import Logo from '../components/SiteLogo';
import Input from '../components/Input';
import MotionDiv from '../components/MotionDiv';
import MotionButton from '../components/MotionButton';
import { useAuthStore } from '../store/auth.store.js';

const LoginPage = () => {
  // Initialize state variables for form inputs
  const [form, setForm] = useState({ email: '', password: '' });

  // Use auth store for login process
  const { isLoggingIn, login, error, setError } = useAuthStore();

  // reset error state on component's first render
  useEffect(() => setError(), [setError]);

  // Handle form input changes and update state accordingly
  const handleOnChange = (e) => {
    setError();
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submission
  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { email, password } = form;
    toast.promise(login({ email, password }), {
      loading: 'Logging In...',
      success: <b>Logged in successfully!</b>,
      error: <b>Failed to login</b>,
    });
  };

  return (
    <div className="w-full h-full min-h-screen hero-bg">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Logo />
      </header>
      <MotionDiv className="flex items-center justify-center mt-12 mx-3">
        <div className="w-full max-w-md px-16 py-10 space-y-6 bg-black/70 rounded-lg shadow-md">
          <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Sign In</h1>
          <form className="space-y-4" onSubmit={handleOnSubmit}>
            <Input
              icon={Mail}
              type="email"
              name="email"
              placeholder="Enter your email"
              autoFocus={true}
              autoComplete="on"
              onChange={handleOnChange}
            />
            <Input icon={Lock} type="password" name="password" placeholder="Password" onChange={handleOnChange} />
            <div>
              <Link to="/forgot/password" className="text-sm text-red-400 hover:underline">
                Forgot password?
              </Link>
            </div>
            {/* if have any error message display it */}
            {error && <p className="text-red-500">{error}</p>}
            {/* submit button */}
            <MotionButton type="submit" disabled={isLoggingIn}>
              {isLoggingIn ? <Loader className="size-6 animate-spin mx-auto" /> : 'Sign In'}
            </MotionButton>
          </form>
          <div className="text-center text-gray-400">
            Don&apos;t have an Account?{' '}
            <Link to="/signup" className="text-red-400 hover:underline">
              Sign up now
            </Link>
          </div>
        </div>
      </MotionDiv>
    </div>
  );
};

export default LoginPage;
