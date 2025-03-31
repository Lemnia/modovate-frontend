import React, { useState } from 'react';
import SimsSubscriptionSection from '../components/SimsSubscriptionSection';
import GTASubscriptionSection from '../components/GTASubscriptionSection';
import InzoiSubscriptionSection from '../components/InzoiSubscriptionSection';
import SecondLifeSubscriptionSection from '../components/SecondLifeSubscriptionSection';
import ValheimSubscriptionSection from '../components/ValheimSubscriptionSection';

const games = [
  { name: 'The Sims', id: 'sims', icon: '/assets/icons/SIMS_icon_transparent.png' },
  { name: 'GTA V', id: 'gta', icon: '/assets/icons/GTA_icon_transparent.png' },
  { name: 'Inzoi', id: 'inzoi', icon: '/assets/icons/INZOI_icon_transparent.png' },
  { name: 'Second Life', id: 'secondlife', icon: '/assets/icons/SECOND_LIFE_icon_transparent.png' },
  { name: 'Valheim', id: 'valheim', icon: '/assets/icons/VALHEIM_icon_transparent.png' },
];

const SubscriptionPage = () => {
  const [selectedGame, setSelectedGame] = useState('sims');

  const renderSubscriptionSection = () => {
    switch (selectedGame) {
      case 'sims':
        return <SimsSubscriptionSection />;
      case 'gta':
        return <GTASubscriptionSection />;
      case 'inzoi':
        return <InzoiSubscriptionSection />;
      case 'secondlife':
        return <SecondLifeSubscriptionSection />;
      case 'valheim':
        return <ValheimSubscriptionSection />;
      default:
        return (
          <div className="text-center text-gray-400 py-20">
            Subscription options for <strong>{selectedGame}</strong> are coming soon.
          </div>
        );
    }
  };

  return (
    <div className="bg-gradient-to-b from-black to-gray-900 min-h-screen text-white pt-[30px] px-6 pb-20 relative overflow-hidden">
      {/* Glow Layers */}
      <div className="absolute top-[150px] left-1/2 -translate-x-1/2 w-[900px] h-[100px] rounded-full bg-cyan-400 opacity-[0.07] blur-2xl pointer-events-none z-0" />
      <div className="absolute top-[250px] left-1/2 -translate-x-1/2 w-[900px] h-[100px] rounded-full bg-cyan-400 opacity-[0.07] blur-2xl pointer-events-none z-0" />

      <div className="text-center mb-12 relative z-10">
        <h1 className="text-4xl font-bold text-brand-orange">Choose Your Subscription</h1>
        <p className="text-gray-300 mt-2">Pick your game and unlock exclusive content!</p>
      </div>

      {/* Game icons styled as Home-like circles */}
      <div className="flex justify-center gap-6 flex-wrap mb-14 relative z-10">
        {games.map((game) => (
          <div
            key={game.id}
            onClick={() => setSelectedGame(game.id)}
            className={`cursor-pointer transition-transform duration-300 flex flex-col items-center ${
              selectedGame === game.id ? 'scale-110' : 'hover:scale-105'
            }`}
          >
            <div
              className={`rounded-full overflow-hidden transition duration-300 w-[186px] h-[186px] flex items-center justify-center ${
                selectedGame === game.id
                  ? 'shadow-[0_0_25px_#00B8B8]/80 border-4 border-brand-accent'
                  : 'border-4 border-transparent hover:shadow-[0_0_15px_#00B8B8]/60'
              }`}
            >
              <img
                src={game.icon}
                alt={game.name}
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <p className="text-white mt-3 font-semibold text-center">{game.name}</p>
          </div>
        ))}
      </div>

      {/* Dynamic subscription section */}
      <div className="relative z-10">{renderSubscriptionSection()}</div>
    </div>
  );
};

export default SubscriptionPage;
