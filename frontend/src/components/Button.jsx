import React from 'react';

const Button = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={`text-white py-2 px-4 rounded-lg transition-colors duration-200 ease-in-out bg-gray-500/70 opacity-100 hover:opacity-85 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
