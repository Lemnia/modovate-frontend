import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const ResetPasswordPage = () => {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/reset-password`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token, password })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Reset failed');

      setMessage(data.message || 'Password reset successfully');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-14 text-white">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white/5 p-8 rounded-xl shadow space-y-4">
        <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 bg-black bg-opacity-20 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-brand-orange rounded hover:bg-opacity-80 transition"
        >
          {loading ? 'Resetting...' : 'Reset Password'}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {message && <p className="text-green-400 text-sm">{message}</p>}
      </form>
    </div>
  );
};

export default ResetPasswordPage;