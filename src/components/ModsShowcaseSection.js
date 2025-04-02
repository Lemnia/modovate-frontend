import React from 'react';
import { Link } from 'react-router-dom';

const ModsShowcaseSection = () => {
  return (
    <section className="bg-[#0b0d10] py-16 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
        {/* Leva strana – Tekstovi */}
        <div className="flex-1 space-y-11 mt-[116px] ml-[98px]">
          {[
            {
              title: 'MODOVATE VISION',
              text: 'Modovate Studio is more than just mods — it’s a platform where creativity meets technology. We believe every game deserves a personal touch.',
            },
            {
              title: 'DYNAMIC CONTENT',
              text: 'From fantasy packs to real-world details, every week brings something new. Handpicked creations by the community, for the community.',
            },
            {
              title: 'JOIN THE REVOLUTION',
              text: 'Support your favorite modder, unlock exclusive features, and redefine the way you play. Creativity has never been this powerful.',
            },
          ].map((section, idx) => (
            <div key={idx} className="border-l-4 border-orange-500 pl-5">
              <h3 className="text-orange-400 text-xl font-bold tracking-wide mb-2 uppercase">
                {section.title}
              </h3>
              <p className="text-gray-300 text-base leading-relaxed max-w-md">
                {section.text}
              </p>
            </div>
          ))}
        </div>

        {/* Desna strana – Popular Mods */}
        <div className="w-full max-w-[470px] text-left mr-[58px]">
          <h2 className="text-3xl font-extrabold text-white mb-8 text-center text-shadow-glow-cyan">
            Popular Mods
          </h2>

          <div className="relative bg-black/30 backdrop-blur-sm border-4 border-orange-500 rounded-xl p-4 overflow-hidden">
            {/* Pozadina */}
            <img
              src="/assets/backgrounds/mods-bg.png"
              alt="Glow Background"
              className="absolute inset-0 w-full h-full object-fill opacity-50 brightness-125 z-0"
            />

            <div className="relative z-10">
              <div className="flex gap-4">
                {/* Leva velika slika */}
                <Link
                  to="/mod/magic-expansion"
                  className="flex flex-col transition-transform duration-300 hover:scale-[1.02]"
                >
                  <img
                    src="/assets/mods/mod1.png"
                    alt="Magic Expansion"
                    className="w-[180px] h-[260px] object-cover rounded"
                  />
                  <span className="text-white mt-2 font-semibold text-center text-sm">
                    Magic Expansion
                  </span>
                </Link>

                {/* Desna 2x2 slike */}
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { src: 'mod2.png', alt: 'Cyber Skins', slug: 'cyber-skins' },
                    { src: 'mod3.png', alt: 'New Realms', slug: 'new-realms' },
                    { src: 'mod4.png', alt: 'Retro Cars', slug: 'retro-cars' },
                    { src: 'mod5.png', alt: 'City Life Pack', slug: 'city-life-pack' },
                  ].map((mod, idx) => (
                    <Link
                      key={idx}
                      to={`/mod/${mod.slug}`}
                      className="flex flex-col transition-transform duration-300 hover:scale-[1.02]"
                    >
                      <img
                        src={`/assets/mods/${mod.src}`}
                        alt={mod.alt}
                        className="w-[140px] h-[100px] object-cover rounded"
                      />
                      <span className="text-white mt-2 font-semibold text-center text-sm">
                        {mod.alt}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Donja široka slika */}
              <Link
                to="/mod/mythical-weapons"
                className="mt-6 flex flex-col items-center transition-transform duration-300 hover:scale-[1.01]"
              >
                <img
                  src="/assets/mods/mod6.png"
                  alt="Mythical Weapons"
                  className="w-full h-[140px] object-cover rounded"
                />
                <span className="text-white mt-2 font-semibold text-center text-sm">
                  Mythical Weapons
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModsShowcaseSection;
