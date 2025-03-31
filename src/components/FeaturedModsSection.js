import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedModsSection = () => {
  const cards = [
    {
      title: 'Mod Title',
      description: 'A short description of this mod. Spice up your gameplay!',
      image: '/assets/featured/featured1.png',
      slug: 'mod-title',
    },
    {
      title: 'Another Mod',
      description: 'Brief info about this awesome mod.',
      image: '/assets/featured/featured2.png',
      slug: 'another-mod',
    },
    {
      title: 'Ultimate Pack',
      description: 'Get the best features in one bundle!',
      image: '/assets/featured/featured3.png',
      slug: 'ultimate-pack',
    },
  ];

  return (
    <section className="bg-[#0b0d10] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-obcen mb-10 text-center tracking-wide">
          Featured Mods
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((mod, idx) => (
            <Link
              to={`/mod/${mod.slug}`}
              key={idx}
              className="bg-darkis border border-obaura rounded-xl overflow-hidden shadow-deep hover:shadow-[0_0_12px_#F47800] transition duration-300 group"
            >
              <img
                src={mod.image}
                alt={mod.title}
                className="w-full h-48 object-cover group-hover:brightness-105"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-obcen mb-2">
                  {mod.title}
                </h3>
                <p className="text-sm text-gray-400 mb-4">{mod.description}</p>
                <span className="bg-obaura hover:bg-orange-600 text-obcen font-medium px-4 py-2 rounded-full transition inline-block text-center">
                  Learn More
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedModsSection;
