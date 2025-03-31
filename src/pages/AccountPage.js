import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import OverviewTab from '../components/account/OverviewTab';
import SubscriptionsTab from '../components/account/SubscriptionsTab';
import PaymentTab from '../components/account/PaymentTab';
import SettingsTab from '../components/account/SettingsTab';

const AccountPage = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedAvatar, setSelectedAvatar] = useState('/assets/avatar-placeholder.png');
  const [customAvatar, setCustomAvatar] = useState(null);

  if (!isLoggedIn) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen pt-28 px-6 pb-16 bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="max-w-7xl mx-auto flex gap-8">
        <aside className="w-[240px] sticky top-28 h-fit backdrop-blur-md bg-white/5 rounded-xl p-4 space-y-6">
          <div className="flex flex-col items-center text-center">
            <img
              src={customAvatar || selectedAvatar}
              alt="User Avatar"
              className="w-24 h-24 rounded-full border-4 border-brand-accent shadow-lg mb-2"
            />
            <h2 className="text-lg font-bold">Demo User</h2>
            <p className="text-sm text-gray-400">demo@modovatestudio.com</p>
            <button
              onClick={logout}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-1.5 rounded-full transition"
            >
              Logout
            </button>
          </div>

          <div className="space-y-2">
            {['overview', 'subscriptions', 'payment', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full flex items-center gap-2 px-4 py-2 rounded-lg transition text-left ${
                  activeTab === tab
                    ? 'bg-brand-accent text-white font-semibold'
                    : 'text-gray-300 hover:bg-white/10'
                }`}
              >
                <span>
                  {{
                    overview: '👤',
                    subscriptions: '📦',
                    payment: '💳',
                    settings: '⚙️',
                  }[tab]}
                </span>
                <span className="capitalize">{tab}</span>
              </button>
            ))}
          </div>
        </aside>

        <main className="flex-1 p-8 backdrop-blur-md bg-white/5 rounded-xl shadow-xl">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <OverviewTab
                selectedAvatar={selectedAvatar}
                customAvatar={customAvatar}
                setActiveTab={setActiveTab}
              />
            )}
            {activeTab === 'subscriptions' && <SubscriptionsTab />}
            {activeTab === 'payment' && <PaymentTab />}
            {activeTab === 'settings' && (
              <SettingsTab
                selectedAvatar={selectedAvatar}
                setSelectedAvatar={setSelectedAvatar}
                customAvatar={customAvatar}
                setCustomAvatar={setCustomAvatar}
              />
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AccountPage;
