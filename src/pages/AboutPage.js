import React from 'react';

const AboutPage = () => {
  return (
    <div className="relative min-h-screen text-white px-4 sm:px-6 lg:px-14 pb-20 overflow-hidden -mt-[126px]">
      {/* Background image behind everything */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: "url('/assets/backgrounds/about-bg.png')" }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0" />

      {/* Main content with correct z-index */}
      <div className="relative z-10 pt-36">
        {/* Hero naslov */}
        <div className="text-center mb-16 px-2">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-brand-accent mb-4 tracking-wider">
            What is Modovate Studio?
          </h1>
          <p className="text-gray-300 text-base sm:text-lg max-w-3xl mx-auto">
            Modovate Studio is a creative hub where passion for games meets artistic freedom. We're redefining modding by empowering players and creators alike — one mod at a time.
          </p>
        </div>

        {/* Misija & Vizija */}
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 mb-20 px-2">
          <div className="flex-1 bg-[#111418] border-l-4 border-brand-orange p-6 rounded-md shadow-md">
            <h3 className="text-2xl font-bold text-brand-orange mb-3">Our Mission</h3>
            <p className="text-gray-300 text-base leading-relaxed">
              To bring immersive, high-quality mods to life that transform gameplay experiences and celebrate the diversity of player imagination across multiple games.
            </p>
          </div>
          <div className="flex-1 bg-[#111418] border-l-4 border-brand-accent p-6 rounded-md shadow-md">
            <h3 className="text-2xl font-bold text-brand-accent mb-3">Our Vision</h3>
            <p className="text-gray-300 text-base leading-relaxed">
              A world where every game is endlessly customizable, and every player becomes part of a thriving creative ecosystem that rewards innovation and expression.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center px-2">
          <h3 className="text-2xl font-bold mb-4">Join the Modding Revolution</h3>
          <p className="text-gray-400 max-w-xl mx-auto mb-6">
            Whether you're here to explore, support, or create — Modovate Studio is your space to shape, share, and shine.
          </p>
          <a
            href="/subscriptions"
            className="bg-brand-orange hover:bg-orange-600 text-white px-6 py-3 rounded-full font-semibold transition"
          >
            Explore Subscriptions
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
