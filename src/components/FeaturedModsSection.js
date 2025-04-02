import React from 'react';

const FeaturedModsSection = () => {
  const mods = [
    { title: 'Elegant Evening Dress', image: '/assets/mods/mod1.png' },
    { title: 'Neon Graffiti Pants', image: '/assets/mods/mod2.png' },
    { title: 'Cyberpunk Jacket', image: '/assets/mods/mod3.png' },
  ];

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">Featured Mods</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {mods.map((mod, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-brand-orange to-brand-accent rounded-2xl p-4 shadow-lg hover:scale-105 transition transform duration-300"
            >
              <img
                src={mod.image}
                alt={mod.title}
                className="w-full h-64 object-cover rounded-xl border-4 border-white/10"
              />
              <h3 className="mt-4 text-xl font-semibold text-center">{mod.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedModsSection;
