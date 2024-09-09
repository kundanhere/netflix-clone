import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

import Logo from '../components/SiteLogo';
import Input from '../components/Input';
import MotionDiv from '../components/MotionDiv';
import MotionButton from '../components/MotionButton';
import PasswordStrengthMeter from '../components/PasswordStrengthMeter';
import { useAuthStore } from '../store/auth.store.js';

const ResetPasswordPage = () => {
  const [form, setForm] = useState({ password: '', confirmPassword: '' });
  const { isLoading, resetPassword, error, setError, message } = useAuthStore();
  const { token } = useParams();
  const navigate = useNavigate();

  // reset error state on component's first render
  useEffect(() => setError(), [setError]);

  // Handle form input changes and update state accordingly
  const handleOnChange = (e) => {
    setError();
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = form;

    // validate password
    if (password?.length < 6) {
      return toast.error('Password must be at least 6 characters long');
    }

    if (password !== confirmPassword) {
      return toast.error('Password dose not match');
    }

    try {
      await resetPassword(token, password);
      toast.success('Password reset successfully, redirecting... you to login page.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      console.error(error.response.data.message);
      toast.error(error.response.data.message || 'Error while resetting password');
    }
  };

  return (
    <div className="w-full h-full min-h-screen hero-bg">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Logo />
      </header>
      <MotionDiv className="flex items-center justify-center mt-12 mx-3">
        <div className="w-full max-w-md px-16 py-10 space-y-6 bg-black/70 rounded-lg shadow-md mb-12">
          <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Reset Password</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              icon={Lock}
              type="password"
              name="password"
              placeholder="New Password"
              autoComplete="off"
              onChange={handleOnChange}
              autoFocus
              required
            />
            <Input
              icon={Lock}
              type="password"
              name="confirmPassword"
              placeholder="Confirm New Password"
              autoComplete="off"
              onChange={handleOnChange}
              required
            />
            {/* if have any error message display it */}
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            {/* password strength meter */}
            <PasswordStrengthMeter password={form.password} />
            {/* submit button */}
            <MotionButton type="submit" disabled={isLoading}>
              {isLoading ? <Loader className="size-6 animate-spin mx-auto" /> : 'Confirm Password'}
            </MotionButton>
          </form>
        </div>
      </MotionDiv>
    </div>
  );
};
export default ResetPasswordPage;
