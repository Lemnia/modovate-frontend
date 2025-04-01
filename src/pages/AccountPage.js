import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AnimatePresence } from 'framer-motion';

import OverviewTab from '../components/account/OverviewTab';
import SubscriptionsTab from '../components/account/SubscriptionsTab';
import PaymentTab from '../components/account/PaymentTab';
import SettingsTab from '../components/account/SettingsTab';

const AccountPage = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedAvatar, setSelectedAvatar] = useState('/assets/avatar-placeholder.png');
  const [customAvatar, setCustomAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch user avatar from backend
    const fetchAvatar = async () => {
      try {
        const res = await fetch('/api/users/avatar', {
          method: 'GET',
          credentials: 'include',
        });
        if (res.ok) {
          const data = await res.json();
          if (data.avatarUrl) {
            setCustomAvatar(data.avatarUrl);
          }
        }
      } catch (err) {
        console.error('Failed to load avatar');
      }
    };
    fetchAvatar();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarPreview(URL.createObjectURL(file));
      uploadAvatar(file);
    }
  };

  const uploadAvatar = async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);
    setUploading(true);
    setError('');

    try {
      const res = await fetch('/api/users/avatar', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      if (!res.ok) throw new Error('Upload failed');
      const data = await res.json();
      setCustomAvatar(data.avatarUrl);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 px-6 pb-16 bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="max-w-7xl mx-auto flex gap-8">
        <aside className="w-[240px] sticky top-28 h-fit backdrop-blur-md bg-white/5 rounded-xl p-4 space-y-6">
          <div className="flex flex-col items-center text-center">
            <img
              src={avatarPreview || customAvatar || selectedAvatar}
              alt="User Avatar"
              className="w-24 h-24 rounded-full border-4 border-brand-accent shadow-lg mb-2"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-sm text-gray-300"
            />
            {uploading && <p className="text-xs text-gray-400">Uploading...</p>}
            {error && <p className="text-xs text-red-500">{error}</p>}
            <h2 className="text-lg font-bold mt-2">Demo User</h2>
            <p className="text-sm text-gray-400">demo@modovatestudio.com</p>
          </div>

          <nav className="flex flex-col gap-2">
            <button onClick={() => setActiveTab('overview')} className={activeTab === 'overview' ? 'font-bold text-brand-accent' : ''}>Overview</button>
            <button onClick={() => setActiveTab('subscriptions')} className={activeTab === 'subscriptions' ? 'font-bold text-brand-accent' : ''}>Subscriptions</button>
            <button onClick={() => setActiveTab('payment')} className={activeTab === 'payment' ? 'font-bold text-brand-accent' : ''}>Payment Methods</button>
            <button onClick={() => setActiveTab('settings')} className={activeTab === 'settings' ? 'font-bold text-brand-accent' : ''}>Settings</button>
          </nav>
        </aside>

        <main className="flex-1">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && <OverviewTab />}
            {activeTab === 'subscriptions' && <SubscriptionsTab />}
            {activeTab === 'payment' && <PaymentTab />}
            {activeTab === 'settings' && <SettingsTab />}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AccountPage;