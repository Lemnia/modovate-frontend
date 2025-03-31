import React from 'react';
import GameCarousel from '../components/GameCarousel';
import ModsShowcaseSection from '../components/ModsShowcaseSection';
import FeaturedModsSection from '../components/FeaturedModsSection';
import ScrollToHash from '../components/ScrollToHash';

const Home = () => {
  return (
    <div className="bg-gradient-to-b from-black to-gray-900 text-white">
      <ScrollToHash />

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden -mt-[126px]">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/assets/hero/hero-bg.png')" }}
        />

        {/* Glow Overlay */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.08),_transparent_70%)]" />

        {/* Content Over Image */}
        <div className="relative z-20 px-16 pt-[180px] text-white">
          <h1 className="text-5xl font-extrabold mb-4">Featured Mods</h1>
          <h2 className="text-3xl font-semibold mb-6">Ignite Your Imagination</h2>
          <div className="flex space-x-4">
            <a
              href="#featured"
              className="bg-brand-accent hover:bg-[#00a3a3] text-white font-semibold px-6 py-3 rounded-full transition"
            >
              Explore Mods
            </a>
            <a
              href="/subscriptions"
              className="bg-transparent hover:bg-white hover:text-black border border-white text-white font-semibold px-6 py-3 rounded-full transition"
            >
              Subscribe
            </a>
          </div>
        </div>
      </section>

      {/* Game Carousel */}
      <section id="games" className="py-10 px-6">
        <GameCarousel />
      </section>

      {/* Showcase and Mods */}
      <ModsShowcaseSection />
      <FeaturedModsSection />

      {/* ==== Join Our Community Section ==== */}
      <section id="about" className="py-16 px-6 bg-[#0b0d10]">
        <div className="flex flex-col items-center mb-4">
          <div className="w-16 h-1 bg-brand-accent mb-2 rounded-full" />
          <h2 className="text-3xl font-bold text-center">
            <span className="text-brand-accent">Join</span> Our Community
          </h2>
        </div>
        <p className="max-w-2xl mx-auto text-center text-gray-300 mb-6">
          Support our modders and gain access to exclusive packs, early releases, and more.
          Choose a subscription plan that suits your style and dive into the creative world of Modovate Studio!
        </p>
        <div className="flex justify-center">
          <a
            href="/subscriptions"
            className="bg-brand-orange hover:bg-brand-accent text-white font-semibold px-6 py-3 rounded-full transition"
          >
            View Subscription Plans
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
