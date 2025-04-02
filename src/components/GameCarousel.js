import React, { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const circleSize = 186;
const gap = 20;
const visibleCount = 4;
const step = circleSize + gap;

const extendedGames = [
  'secondlife', 'sims', 'inzoi', 'gta', 'valheim',
  'secondlife', 'sims', 'inzoi', 'gta', 'valheim'
];

const GameCarousel = () => {
  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);

  const scroll = (direction) => {
    const newIndex = direction === 'left' ? index - 1 : index + 1;
    setIndex((newIndex + extendedGames.length) % extendedGames.length);
  };

  return (
    <section className="relative w-full overflow-hidden px-4 sm:px-6 lg:px-14">
      <div className="relative max-w-[1000px] mx-auto">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => scroll('left')}
            className="text-brand-orange hover:text-white transition"
          >
            <ChevronLeft size={36} />
          </button>
          <button
            onClick={() => scroll('right')}
            className="text-brand-accent hover:text-white transition"
          >
            <ChevronRight size={36} />
          </button>
        </div>

        <div className="overflow-hidden">
          <div
            ref={containerRef}
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${index * step}px)`
            }}
          >
            {extendedGames.map((game, i) => (
              <div
                key={i}
                className="shrink-0 rounded-full border-4 border-brand-orange hover:scale-105 transition duration-300"
                style={{
                  width: `${circleSize}px`,
                  height: `${circleSize}px`,
                  marginRight: `${gap}px`,
                  backgroundImage: `url(/assets/icons/${game}.png)`
                }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GameCarousel;