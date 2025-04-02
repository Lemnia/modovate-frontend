import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/auth/status`, {
        method: 'GET',
        credentials: 'include'
      });

      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/forgot-password`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Failed to send reset email');
      }

      setMessage(data.message || 'Reset link sent. Check your email.');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-14 text-white">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white/5 p-8 rounded-xl shadow space-y-4">
        <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 bg-black bg-opacity-20 rounded"
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full p-2 bg-brand-orange rounded hover:bg-opacity-80 transition"
        >
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {message && <p className="text-green-400 text-sm">{message}</p>}
        <div className="text-sm mt-2">
          <Link to="/login" className="text-brand-light hover:underline">Back to Login</Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
