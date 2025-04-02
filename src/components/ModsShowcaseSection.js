import React from 'react';
import { Link } from 'react-router-dom';

const features = [
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
];

const ModsShowcaseSection = () => {
  return (
    <section className="mt-20 sm:mt-28 mb-16 px-4 sm:px-6 lg:px-14">
      <div className="flex flex-col md:flex-row items-start justify-between gap-10">
        {/* Leva strana – Tekstualni opis sa 3 bloka */}
        <div className="flex flex-col gap-6 md:w-1/2">
          {features.map((feature, index) => (
            <div key={index}>
              <h3 className="text-xl font-bold text-brand-orange mb-2">{feature.title}</h3>
              <p className="text-gray-300">{feature.text}</p>
            </div>
          ))}
        </div>

        {/* Desna strana – Slike modova */}
        <div className="flex justify-center md:w-1/2 flex-wrap gap-4">
          <Link to="/mod/magic-expansion">
            <img
              src="/assets/mods/mod1.png"
              alt="Mod 1"
              className="w-[160px] h-[120px] rounded-xl object-cover hover:scale-105 transition-transform"
            />
          </Link>
          <Link to="/mod/fantasy-world">
            <img
              src="/assets/mods/mod2.png"
              alt="Mod 2"
              className="w-[160px] h-[120px] rounded-xl object-cover hover:scale-105 transition-transform"
            />
          </Link>
          <Link to="/mod/character-skins">
            <img
              src="/assets/mods/mod3.png"
              alt="Mod 3"
              className="w-[160px] h-[120px] rounded-xl object-cover hover:scale-105 transition-transform"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ModsShowcaseSection;
