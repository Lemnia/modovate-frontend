import React from 'react';
import { motion } from 'framer-motion';

const OverviewTab = ({ selectedAvatar, customAvatar, setActiveTab }) => {
  const recentActivity = [
    'Logged in',
    'Subscribed to Sims - Hair Pack',
    'Changed avatar',
  ];

  const userSubscriptions = [
    {
      game: 'The Sims',
      tierName: 'Premium',
      price: '$4.99/mo',
    },
    {
      game: 'GTA V',
      tierName: 'Crime Boss',
      price: '$11.99/mo',
    },
  ];

  return (
    <motion.div
      key="overview"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-8"
    >
      <h2 className="text-2xl font-bold text-brand-accent">Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/10 rounded-xl p-6 space-y-4">
          <img
            src={customAvatar || selectedAvatar}
            alt="Avatar"
            className="w-24 h-24 rounded-full border-4 border-brand-accent shadow-lg mx-auto"
          />
          <div className="text-center">
            <h3 className="text-xl font-semibold">Demo User</h3>
            <p className="text-gray-300">demo@modovatestudio.com</p>
            <p className="text-sm text-gray-400 mt-1">Joined: January 2024</p>
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-6 space-y-4">
          <h4 className="text-lg font-semibold text-white">Subscription Summary</h4>
          <p>
            You have{' '}
            <span className="text-brand-orange font-semibold">{userSubscriptions.length}</span> active subscriptions.
          </p>
          <button
            onClick={() => setActiveTab('subscriptions')}
            className="mt-2 bg-brand-accent hover:bg-teal-600 text-white px-4 py-2 rounded-full transition"
          >
            View Subscriptions
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/10 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-white mb-4">Recent Activity</h4>
          <ul className="list-disc list-inside space-y-1 text-gray-300">
            {recentActivity.map((activity, idx) => (
              <li key={idx}>{activity}</li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default OverviewTab;
