import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#0b0d10] border-t border-orange-500 pt-6 pb-4 mt-0">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center px-4 sm:px-6 lg:px-14">
        <div className="flex flex-col sm:flex-row items-center justify-center -translate-x-0 sm:mb-[-100px] sm:mt-[-60px] sm:-translate-x-[25px]">
          <span className="text-3xl font-extrabold text-brand-light tracking-widest sm:-mr-5 opacity-70 pointer-events-none select-none">
            MODOVATE
          </span>
          <img
            src="/assets/logo/Logotip_transparent_notext.png"
            alt="Modovate Logo"
            className="h-[160px] w-[150px] sm:h-[220px] sm:w-[200px] object-contain relative top-3"
          />
          <span className="text-2xl font-semibold text-brand-orange tracking-[0.5em] sm:-ml-6 opacity-70 pointer-events-none select-none">
            STUDIO
          </span>
        </div>

        <div className="w-full flex flex-col md:flex-row justify-between items-center mt-6 space-y-2 md:space-y-0">
          <p className="text-sm text-gray-400 text-center md:text-left">
            &copy; {new Date().getFullYear()} Modovate Studio. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-400">
            <Link to="/mods" className="hover:text-white transition">Mods</Link>
            <Link to="/games" className="hover:text-white transition">Games</Link>
            <Link to="/about" className="hover:text-white transition">About</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
