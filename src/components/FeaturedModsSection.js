import React from 'react';

const FeaturedModsSection = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-white">Featured Mods</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white/5 rounded-2xl border-4 border-brand-orange p-4 shadow-xl transition duration-300 transform hover:-translate-y-1 hover:scale-105">
            <img
              src="/assets/mods/mod1.png"
              alt="Featured Mod 1"
              className="rounded-xl mb-4 w-full h-48 object-cover"
            />
            <h3 className="text-xl font-semibold text-white">Epic Weapon Pack</h3>
            <p className="text-gray-400">Enhance your gameplay with powerful new weapons.</p>
          </div>
          <div className="bg-white/5 rounded-2xl border-4 border-brand-orange p-4 shadow-xl transition duration-300 transform hover:-translate-y-1 hover:scale-105">
            <img
              src="/assets/mods/mod2.png"
              alt="Featured Mod 2"
              className="rounded-xl mb-4 w-full h-48 object-cover"
            />
            <h3 className="text-xl font-semibold text-white">Fantasy World Pack</h3>
            <p className="text-gray-400">Transform your environment into a magical land.</p>
          </div>
          <div className="bg-white/5 rounded-2xl border-4 border-brand-orange p-4 shadow-xl transition duration-300 transform hover:-translate-y-1 hover:scale-105">
            <img
              src="/assets/mods/mod3.png"
              alt="Featured Mod 3"
              className="rounded-xl mb-4 w-full h-48 object-cover"
            />
            <h3 className="text-xl font-semibold text-white">Character Skin Pack</h3>
            <p className="text-gray-400">Choose from a variety of new character skins.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedModsSection;
