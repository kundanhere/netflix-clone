import { Link } from 'react-router-dom';

const Logo = ({ className, ...props }) => {
  return (
    <Link to="/" {...props} className="outline-none">
      <img src="/netflix-logo.png" alt="site-logo" className={`w-32 md:w-44 ${className}`} />
    </Link>
  );
};

export default Logo;
