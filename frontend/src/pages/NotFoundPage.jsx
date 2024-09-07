import { Link } from 'react-router-dom';
import Logo from '../components/SiteLogo';

const NotFoundPage = () => {
  return (
    <div
      className="h-screen bg-cover bg-center flex flex-col justify-center items-center text-white"
      style={{ backgroundImage: `url('/404.png')` }}
    >
      <header className="absolute top-0 left-0 px-8 py-6 bg-black w-full ">
        <Logo className="!w-auto !h-8" />
      </header>
      <main className="text-center error-page--content z-10 top-0 relative">
        <h1 className="text-7xl font-semibold mb-8">Lost your way?</h1>
        <p className="mb-6 text-2xl text-balance">
          Sorry, we can&apos;t find that page. You&apos;ll find lots to explore on the home page.
        </p>
        <Link
          to="/"
          className="bg-white text-xl text-black font-semibold py-2 px-4 rounded hover:bg-gray-300 transition-all duration-300 ease-in-out"
        >
          Netflix Home
        </Link>
        <p className="mt-8 text-4xl text-balance font-light">
          Error Code <b>NSES - 404</b>
        </p>
      </main>
    </div>
  );
};
export default NotFoundPage;
