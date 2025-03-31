import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SettingsTab = ({
  selectedAvatar,
  setSelectedAvatar,
  customAvatar,
  setCustomAvatar,
}) => {
  const [showAvatarOptions, setShowAvatarOptions] = useState(false);

  const avatarOptions = Array.from({ length: 16 }, (_, i) => `/assets/avatars/avatar${i + 1}.png`);

  const handleAvatarSelect = (src) => {
    setSelectedAvatar(src);
    setCustomAvatar(null);
  };

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomAvatar(url);
      setSelectedAvatar(null);
    }
  };

  const handleSaveChanges = () => {
    alert('Avatar saved (dummy logic).');
    setShowAvatarOptions(false);
  };

  const handleCancel = () => {
    setShowAvatarOptions(false);
  };

  return (
    <motion.div
      key="settings"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-brand-accent">Settings</h2>

      <div className="flex items-center gap-6">
        <img
          src={customAvatar || selectedAvatar}
          alt="Current Avatar"
          className="w-24 h-24 rounded-full border-4 border-brand-accent shadow-lg"
        />

        {!showAvatarOptions && (
          <button
            onClick={() => setShowAvatarOptions(true)}
            className="bg-brand-orange hover:bg-orange-500 text-white font-semibold px-6 py-2 rounded-full transition"
          >
            Change Avatar
          </button>
        )}

        {showAvatarOptions && (
          <div className="flex gap-4">
            <button
              onClick={handleSaveChanges}
              className="bg-brand-accent hover:bg-teal-600 text-white font-semibold px-6 py-2 rounded-full transition"
            >
              Save Changes
            </button>
            <button
              onClick={handleCancel}
              className="bg-brand-orange hover:bg-orange-500 text-white font-semibold px-6 py-2 rounded-full transition"
            >
              Cancel
            </button>
          </div>
        )}
      </div>

      {showAvatarOptions && (
        <div className="relative mt-8">
          <h3 className="text-lg font-semibold text-white mb-2">Choose an Avatar</h3>
          <div className="grid grid-cols-4 gap-4 mb-6">
            {avatarOptions.map((src, idx) => (
              <motion.img
                whileHover={{ scale: 1.1 }}
                key={idx}
                src={src}
                alt={`Avatar ${idx + 1}`}
                onClick={() => handleAvatarSelect(src)}
                className={`w-20 h-20 rounded-full cursor-pointer border-4 transition duration-200 ${
                  selectedAvatar === src ? 'border-brand-accent scale-105' : 'border-transparent'
                }`}
              />
            ))}
          </div>

          <div className="mt-4">
            <h3 className="text-white font-semibold mb-2">Or Upload Custom Avatar</h3>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="block w-full text-sm text-gray-300"
            />
          </div>

          <button
            onClick={handleCancel}
            className="absolute right-0 -bottom-16 bg-gray-700 hover:bg-gray-600 text-white font-semibold px-6 py-2 rounded-full transition"
          >
            Hide Avatars
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default SettingsTab;
