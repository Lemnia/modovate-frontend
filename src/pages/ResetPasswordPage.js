import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPasswordPage = () => {
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();

    if (!newPass || !confirmPass) {
      setError('Fill in both fields.');
      return;
    }

    if (newPass !== confirmPass) {
      setError('Passwords do not match.');
      return;
    }

    console.log('Password changed to:', newPass);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md bg-[#111418] rounded-lg shadow-lg p-8 border border-brand-orange">
        <h2 className="text-3xl font-extrabold text-brand-accent text-center mb-6">Set New Password</h2>
        {error && <div className="bg-red-600 text-white px-4 py-2 mb-4 rounded text-sm">{error}</div>}
        <form onSubmit={handleReset} className="space-y-5">
          <input type="password" placeholder="New Password" value={newPass} onChange={(e) => setNewPass(e.target.value)} className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:ring-2 focus:ring-brand-accent" />
          <input type="password" placeholder="Confirm New Password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:ring-2 focus:ring-brand-accent" />
          <button type="submit" className="w-full bg-brand-orange hover:bg-orange-600 text-white font-semibold py-2 rounded">Change Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
