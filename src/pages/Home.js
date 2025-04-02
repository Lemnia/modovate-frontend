import React from 'react';
import GameCarousel from '../components/GameCarousel';
import FeaturedMods from '../components/FeaturedModsSection';

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-black to-gray-900 text-white px-4 sm:px-6 lg:px-14 pt-28 pb-16 overflow-hidden">
      <section className="text-center mb-16">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4">
          Discover, Customize, <span className="text-brand-orange">Transform</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto">
          Explore powerful mods for your favorite games — all in one place.
        </p>
      </section>

      <GameCarousel />
      <FeaturedMods />
    </div>
  );
};

export default Home;