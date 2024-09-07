import { motion } from 'framer-motion';

const MotionButton = ({ disabled = false, children, ...props }) => {
  return (
    <motion.button
      {...props}
      disabled={disabled}
      className={`mt-5 w-full py-3 ${disabled ? 'focus:outline-none bg-red-300 cursor-not-allowed' : 'bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900'} text-white font-semibold rounded-lg shadow-lg transition duration-200`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
};

export default MotionButton;
