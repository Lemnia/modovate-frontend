import React from 'react';

const ModsShowcaseSection = () => {
  return (
    <section className="mt-20 sm:mt-28 mb-16 px-4 sm:px-6 lg:px-14">
      <div className="flex flex-col md:flex-row items-center justify-center gap-10">
        <div className="flex flex-col gap-4 md:w-1/2">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-orange mb-2">
            Popular Mods
          </h2>
          <p className="text-gray-300 max-w-md">
            Browse the most downloaded mods of the month. New characters, outfits, maps, and much more.
          </p>
        </div>

        <div className="flex justify-center md:w-1/2 flex-wrap gap-4">
          <img src="/assets/mods/mod1.png" alt="Mod 1" className="w-[160px] h-[120px] rounded-xl object-cover" />
          <img src="/assets/mods/mod2.png" alt="Mod 2" className="w-[160px] h-[120px] rounded-xl object-cover" />
          <img src="/assets/mods/mod3.png" alt="Mod 3" className="w-[160px] h-[120px] rounded-xl object-cover" />
        </div>
      </div>
    </section>
  );
};

export default ModsShowcaseSection;
