import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import toast from 'react-hot-toast';

import Logo from '../components/SiteLogo';
import MotionDiv from '../components/MotionDiv';
import MotionButton from '../components/MotionButton';
import { useAuthStore } from '../store/auth.store.js';

const EmailVerificationPage = () => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const { verifyEmail, error, setError, isLoading } = useAuthStore();

  const handleChange = (index, value) => {
    const newCode = [...code];

    // Handle pasted content
    if (value.length > 1) {
      const pastedCode = value.slice(0, 6).split('');
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || '';
      }
      setCode(newCode);

      // Focus on the last non-empty input or the first empty one
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== '');
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      // Move focus to the next input field if value is entered
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join('');
    if (!verificationCode || isNaN(verificationCode)) return toast.error('Invalid Request - Code must be a number.');
    try {
      await verifyEmail(verificationCode);
      navigate('/');
      toast.success('Email verified successfully!');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Auto submit when all fields are filled
  useEffect(() => {
    setError();
    if (code.every((digit) => digit !== '')) {
      handleSubmit(new Event('submit'));
    }
  }, [code, setError]);

  return (
    <div className="w-full h-full min-h-screen hero-bg">
      <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Logo />
      </header>
      <MotionDiv className="flex items-center justify-center mt-12 mx-3">
        <div className="w-full max-w-md px-16 py-10 space-y-6 bg-black/70 rounded-lg shadow-md">
          <h1 className="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-4">Verify Your Email</h1>
          <p className="text-left text-gray-300 mb-6 text-xs leading-6">
            Enter the 6-digit code sent to your email address.
          </p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex justify-between">
              {code.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  name="code"
                  autoComplete="off"
                  maxLength="6"
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="size-12 text-center text-2xl font-bold bg-gray-700 text-white border-2 border-gray-600 rounded-lg focus:border-red-500 focus:outline-none"
                />
              ))}
            </div>
            {/* if have any error message display it */}
            {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
            {/* submit button */}
            <MotionButton type="submit" disabled={isLoading || code.some((digit) => !digit)}>
              {isLoading ? <Loader className="size-6 animate-spin mx-auto" /> : 'Verify email'}
            </MotionButton>
          </form>
        </div>
      </MotionDiv>
    </div>
  );
};
export default EmailVerificationPage;
