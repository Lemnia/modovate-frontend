import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedModsSection = () => {
  return (
    <section className="bg-brand-dark text-white py-20 px-4 sm:px-8 md:px-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6 z-10">
          <h2 className="text-4xl font-bold leading-tight">
            Explore Our Featured Mods
          </h2>
          <p className="text-lg text-gray-300">
            Discover a curated selection of the most popular mods from our creators.
            Whether you're into fantasy, realism, or fun, we’ve got something for everyone.
          </p>
          <Link
            to="/mods"
            className="inline-block bg-brand-orange hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition"
          >
            Browse All Mods
          </Link>
        </div>

        <div className="relative z-10">
          <img
            src="/assets/sections/featured-mods-preview.png"
            alt="Preview of Featured Mods"
            className="rounded-xl shadow-lg w-full"
          />
        </div>
      </div>

      {/* Decorative blurred background shape */}
      <div className="absolute top-[-100px] right-[-100px] w-[300px] h-[300px] bg-brand-accent opacity-30 rounded-full filter blur-3xl z-0" />
    </section>
  );
};

export default FeaturedModsSection;
