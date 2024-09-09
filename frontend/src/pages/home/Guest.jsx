import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Guest = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to sign-up page when user submits the form
    navigate('/signup?email=' + email);
  };

  return (
    <div className="w-full relative">
      <div className="w-full hero-bg">
        {/* navbar */}
        <header className="max-w-6xl mx-auto flex items-center justify-between p-4">
          <Link to="/">
            <img src="/netflix-logo.png" alt="app-logo" className="w-32 md:w-44" />
          </Link>
          <Link to="/login" className="text-white bg-red-600 hover:bg-red-700 py-2 px-4 rounded-lg">
            Sign In
          </Link>
        </header>
        {/* hero section */}
        <div className="flex flex-col items-center justify-center text-center max-w-screen-sm w-full overflow-x py-32 px-4 md:px-0 text-white mx-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 md:mb-4 text-balance">
            Unlimited movies, TV shows, and more.
          </h1>
          <h3 className="text-lg md:text-2xl font-semibold gap-2 md:gap-20 mb-2 md:mb-4">Watch anywhere, anytime.</h3>
          <p className="mb-6 md:mb-8 text-balance text-xs leading-5">
            Ready to watch? Enter your email to create or restart your membership.
          </p>
          <form
            className="flex flex-col justify-evenly md:flex-row gap-2 md:gap-1 w-1/2 md:w-10/12"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              id="email"
              autoComplete="off"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full md:w-1/2 py-3 px-4 flex flex-1 border border-gray-500 rounded-lg bg-transparent text-white focus:outline-none focus:ring"
            />
            <button className="text-xl lg:text-2xl text-white bg-red-600 hover:bg-red-700 py-1 lg:py-2 px-2 lg:px-4 rounded-lg flex justify-center items-center">
              Get Started <ChevronRight className="size-4 md:size-8" />
            </button>
          </form>
        </div>
      </div>

      {/* 1st section */}
      <div className="py-10 px-8 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-between md:flex-row flex-col px-4 md:px-2">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold gap-2 md:gap-20 mb-3 md:mb-4">
              Enjoy your TV Show
            </h2>
            <p className="text-xs md:text-lg text-balance leading-5">
              Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.
            </p>
          </div>
          <div className="flex-1 relative">
            <img src="/tv.png" alt="TV image" className="mt-4 z-20 relative" />
            <video
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1/2 z-0"
              playsInline
              autoPlay
              muted
              loop
            >
              <source src="/hero-vid.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* separator */}
      <div className="h-1 w-full bg-[#232323]" aria-hidden="true"></div>
      {/* 2nd section */}
      <div className="py-10 px-8 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col-reverse px-4 md:px-2">
          <div className="flex-1">
            <div className="relative">
              <img src="/stranger-things-lg.png" alt="Stranger Things Large image" className="mt-4" />
              <div className="flex items-center gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 bg-black w-3/4 lg:w-1/2 h-24 border border-slate-500 rounded-md p-2">
                <img src="/stranger-things-sm.png" alt="Stranger Things Small image" className="h-full" />
                <div className="flex justify-between items-center w-full">
                  <div className="flex flex-col gap-0">
                    <span className="text-md lg:text-lg font-bold">Stranger Things</span>
                    <span className="text-sm text-blue-500">Downloading...</span>
                  </div>
                  <img src="/download-icon.gif" alt="download icon" className="h-12" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold gap-2 md:gap-20 mb-3 md:mb-4 text-balance">
              Download your shows to watch offline
            </h2>
            <p className="text-xs md:text-lg text-balance leading-5">
              Save your favorites easily and alyways have something to watch.
            </p>
          </div>
        </div>
      </div>

      {/* separator */}
      <div className="h-1 w-full bg-[#232323]" aria-hidden="true"></div>
      {/* 3rd section */}
      <div className="py-10 px-8 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center md:flex-row flex-col px-4 md:px-2">
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold gap-2 md:gap-20 mb-3 md:mb-4">
              Watch everywhere
            </h2>
            <p className="text-xs md:text-lg text-balance leading-5">
              Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.
            </p>
          </div>
          <div className="flex-1 relative">
            <img src="/device-pile.png" alt="Device image" className="mt-4 z-20 relative" />
            <video
              className="absolute top-2 left-1/2 -translate-x-1/2 h-4/6 z-0 max-w-[63%]"
              playsInline
              autoPlay
              muted
              loop
            >
              <source src="/video-devices.m4v" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      {/* separator */}
      <div className="h-1 w-full bg-[#232323]" aria-hidden="true"></div>
      {/* 4th section */}
      <div className="py-10 px-8 bg-black text-white">
        <div className="flex max-w-6xl mx-auto items-center justify-center gap-2 md:gap-20 md:flex-row flex-col-reverse px-4 md:px-2">
          <div className="flex-1 relative">
            <img src="/kids.png" alt="Device image" className="mt-4" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-3 md:mb-4">Create profile for kids</h2>
            <p className="text-xs md:text-lg text-balance leading-5">
              Send kids on adventures with their favorite charcters in a space made just for them-free with your
              membershop.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Guest;
