import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

const games = [
  { name: 'The Sims', icon: '/assets/icons/SIMS_icon_transparent.png' },
  { name: 'Inzoi', icon: '/assets/icons/INZOI_icon_transparent.png' },
  { name: 'GTA V', icon: '/assets/icons/GTA_icon_transparent.png' },
  { name: 'Second Life', icon: '/assets/icons/SECOND_LIFE_icon_transparent.png' },
  { name: 'Valheim', icon: '/assets/icons/VALHEIM_icon_transparent.png' },
];

const GameCarousel = () => {
  const [position, setPosition] = useState(0);
  const containerRef = useRef(null);

  const visibleCount = 4;
  const circleSize = 186;
  const gap = 24;
  const step = circleSize + gap;

  const extendedGames = [
    ...games.slice(-visibleCount),
    ...games,
    ...games.slice(0, visibleCount),
  ];

  const initialIndex = visibleCount;
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.style.transition = 'none';
      container.style.transform = `translateX(-${step * currentIndex}px)`;
    }
  }, []);

  const handleNext = () => {
    const container = containerRef.current;
    if (!container) return;

    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex);
    container.style.transition = 'transform 0.5s ease-in-out';
    container.style.transform = `translateX(-${step * newIndex}px)`;

    if (newIndex === extendedGames.length - visibleCount) {
      setTimeout(() => {
        container.style.transition = 'none';
        container.style.transform = `translateX(-${step * initialIndex}px)`;
        setCurrentIndex(initialIndex);
      }, 510);
    }
  };

  const handlePrev = () => {
    const container = containerRef.current;
    if (!container) return;

    const newIndex = currentIndex - 1;
    setCurrentIndex(newIndex);
    container.style.transition = 'transform 0.5s ease-in-out';
    container.style.transform = `translateX(-${step * newIndex}px)`;

    if (newIndex === 0) {
      setTimeout(() => {
        const resetIndex = extendedGames.length - 2 * visibleCount;
        container.style.transition = 'none';
        container.style.transform = `translateX(-${step * resetIndex}px)`;
        setCurrentIndex(resetIndex);
      }, 510);
    }
  };

  return (
    <div className="relative text-center py-20 overflow-hidden">
      {/* Halo Glow Bar - diskretna traka */}
      <div className="absolute top-[52%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[860px] h-[160px] rounded-full bg-cyan-500 opacity-[0.07] blur-[70px] z-0 pointer-events-none" />

      <div className="flex items-center justify-center relative z-10">
        {/* Left arrow */}
        <img
          src="/assets/icons/arrow-left.png"
          alt="Previous"
          onClick={handlePrev}
          className="w-10 h-10 cursor-pointer absolute left-[100px] top-1/2 transform -translate-y-1/2 z-20"
        />

        {/* Carousel */}
        <div className="overflow-hidden" style={{ width: `${step * visibleCount}px` }}>
          <div
            ref={containerRef}
            className="flex gap-6"
            style={{ willChange: 'transform' }}
          >
            {extendedGames.map((game, idx) => (
              <Link
                key={idx}
                to={`/game/${game.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex flex-col items-center flex-shrink-0 group transition duration-300 ease-in-out hover:scale-105"
              >
                <img
                  src={game.icon}
                  alt={game.name}
                  className="rounded-full object-cover shadow transition duration-300 ease-in-out group-hover:shadow-[0_0_20px_#00B8B8]/80"
                  style={{ width: `${circleSize}px`, height: `${circleSize}px` }}
                />
                <span className="text-white mt-2 font-semibold">{game.name}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Right arrow */}
        <img
          src="/assets/icons/arrow-right.png"
          alt="Next"
          onClick={handleNext}
          className="w-10 h-10 cursor-pointer absolute right-[100px] top-1/2 transform -translate-y-1/2 z-20"
        />
      </div>
    </div>
  );
};

export default GameCarousel;
