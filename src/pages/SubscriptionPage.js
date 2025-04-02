import React from 'react';
import { Link } from 'react-router-dom';

const SubscriptionPage = () => {
  return (
    <div className="min-h-screen pt-28 px-4 sm:px-6 lg:px-14 pb-16 bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold">Subscription Plans</h1>
        <p className="text-lg text-gray-300">
          Choose the plan that fits your favorite game. Each subscription gives you access to exclusive content.
        </p>

        <div className="grid gap-6 sm:grid-cols-2">
          <div className="bg-white/5 p-6 rounded-xl shadow text-center">
            <h2 className="text-xl font-bold mb-2">Sims Package</h2>
            <p className="text-gray-400 mb-4">Clothes, objects, animations</p>
            <p className="text-2xl font-semibold text-brand-accent mb-4">$4.99/month</p>
            <Link to="/checkout" className="bg-brand-orange hover:bg-orange-600 px-6 py-2 rounded text-white inline-block">
              Subscribe
            </Link>
          </div>

          <div className="bg-white/5 p-6 rounded-xl shadow text-center">
            <h2 className="text-xl font-bold mb-2">Second Life Bundle</h2>
            <p className="text-gray-400 mb-4">Full avatars, environments, skins</p>
            <p className="text-2xl font-semibold text-brand-accent mb-4">$7.99/month</p>
            <Link to="/checkout" className="bg-brand-orange hover:bg-orange-600 px-6 py-2 rounded text-white inline-block">
              Subscribe
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;