import React from 'react';
import { Link } from 'react-router-dom';

const ThankYouPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white pt-[120px] px-6 pb-20 flex items-center justify-center">
      <div className="max-w-2xl text-center bg-black/40 backdrop-blur-sm border border-brand-accent rounded-2xl px-10 py-16 shadow-lg">
        <h1 className="text-4xl font-extrabold text-brand-orange mb-6">Thank You for Your Support!</h1>

        <p className="text-lg text-gray-300 mb-6 leading-relaxed">
          Your subscription means the world to us. 💖 Thanks to your support, Modovate Studio can continue crafting unique, high-quality mods that bring new life to your favorite games.
        </p>

        <p className="text-md text-gray-400 mb-8">
          Every tier you choose helps us push creative boundaries and share joy with players around the world. You're not just a subscriber — you're part of our growing modding revolution!
        </p>

        <Link
          to="/"
          className="inline-block bg-brand-accent hover:bg-[#00a3a3] text-white font-semibold px-8 py-3 rounded-full transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;
