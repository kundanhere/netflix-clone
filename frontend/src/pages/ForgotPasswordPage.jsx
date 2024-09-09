import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Loader, Mail } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

import Logo from '../components/SiteLogo';
import Input from '../components/Input';
import MotionDiv from '../components/MotionDiv';
import MotionButton from '../components/MotionButton';
import { useAuthStore } from '../store/auth.store.js';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { isLoading, forgotPassword } = useAuthStore();

  const sendLink = async () => {
    try {
      await forgotPassword(email);
      setIsSubmitted(true);
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.promise(sendLink(), {
      loading: 'Email Sending...',
      success: <b>Password reset link sent successfully!</b>,
      error: <b>User not found!</b>,
    });
  };

  return (
    <div className="w-full h-full min-h-screen hero-bg">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Logo />
      </header>
      <MotionDiv className="flex flex-col items-center justify-center mt-12 mx-3">
        <div className="w-full max-w-md px-16 py-10 space-y-6 bg-black/70 rounded-lg shadow-md">
          <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-center">Forgot Password</h1>
          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <p className="text-gray-300 mb-6 text-center text-xs leading-6">
                Enter your email address and we&apos;ll send you a link to reset your password.
              </p>
              <Input
                icon={Mail}
                type="email"
                name="email"
                placeholder="Enter your email"
                autoComplete="on"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <MotionButton type="submit" disabled={isLoading || isSubmitted}>
                {isLoading ? <Loader className="size-6 animate-spin mx-auto" /> : 'Send Reset Link'}
              </MotionButton>
            </form>
          ) : (
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Mail className="h-8 w-8 text-white" />
              </motion.div>
              <p className="text-gray-300 mb-6 text-center text-xs leading-6">
                If an account exists for <b>{email}</b>, you will receive a password reset link shortly.
              </p>
            </div>
          )}
          <div className="text-center">
            <Link
              to={'/login'}
              className="text-sm text-red-400 hover:underline inline-flex items-center justify-center"
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
            </Link>
          </div>
        </div>
      </MotionDiv>
    </div>
  );
};
export default ForgotPasswordPage;
