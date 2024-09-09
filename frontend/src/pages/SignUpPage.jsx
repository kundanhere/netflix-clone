import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Loader, Mail, User, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

import Logo from '../components/SiteLogo';
import Input from '../components/Input';
import MotionDiv from '../components/MotionDiv';
import MotionButton from '../components/MotionButton';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import { useAuthStore } from '../store/auth.store.js';

const SignUpPage = () => {
  // Extract email from query parameters if provided
  const { searchParams } = new URL(document.location);
  const userEmail = searchParams.get('email');

  // Initialize state variables with email extracted from query parameters or an empty string
  const [form, setForm] = useState({
    email: userEmail || '',
    username: '',
    password: '',
  });

  // Use auth store for signup process
  const { isSigningUp, signup, error, setError } = useAuthStore();

  // reset error state on component's first render
  useEffect(() => setError(), [setError]);
  const navigate = useNavigate();

  // Handle form input changes and update state accordingly
  const handleOnChange = (e) => {
    setError();
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // handle account signup
  async function handleSignUp() {
    try {
      const { email, username, password } = form;
      await signup({ username, email, password });
      navigate('/verify/email');
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Handle form submission
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    // Show success or failure toast message based on signup result
    toast.promise(handleSignUp(), {
      loading: 'Signing up...',
      success: <b>Signup successful!</b>,
      error: <b>Signup failed</b>,
    });
  };

  // Page component
  return (
    <div className="w-full h-full min-h-screen hero-bg">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Logo />
      </header>
      <MotionDiv className="flex items-center justify-center mt-12 mx-3">
        <div className="w-full max-w-md px-16 py-10 space-y-6 bg-black/70 rounded-lg shadow-md mb-12">
          <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Sign Up</h1>
          <form className="space-y-4" onSubmit={handleOnSubmit}>
            <Input
              icon={Mail}
              type="email"
              name="email"
              placeholder="Enter your email"
              autoFocus={true}
              autoComplete="on"
              value={form.email}
              onChange={handleOnChange}
            />
            <Input
              icon={User}
              type="text"
              name="username"
              placeholder="Username"
              autoComplete="on"
              onChange={handleOnChange}
            />
            <Input icon={Lock} type="password" name="password" placeholder="Password" onChange={handleOnChange} />
            {/* if have any error message display it */}
            {error && <p className="text-red-500">{error}</p>}
            {/* password strength meter */}
            <PasswordStrengthMeter password={form.password} />
            {/* submit button */}
            <MotionButton type="submit" disabled={isSigningUp}>
              {isSigningUp ? <Loader className="size-6 animate-spin mx-auto" /> : 'Sign Up'}
            </MotionButton>
          </form>
          <div className="text-center text-gray-400">
            Already a member?{' '}
            <Link to="/login" className="text-red-400 hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </MotionDiv>
    </div>
  );
};

export default SignUpPage;
