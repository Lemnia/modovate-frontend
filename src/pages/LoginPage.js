// src/pages/LoginPage.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function getCookie(name) {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? match[2] : null;
}

const LoginPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please enter both email and password.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('https://modovate-backend.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-XSRF-TOKEN': getCookie('XSRF-TOKEN'),
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed.');
      }

      // Pošto backend vraća samo message, mi ručno postavljamo user kao "logged in"
      setUser({ email });
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md bg-[#111418] rounded-lg shadow-lg p-8 border border-brand-orange">
        <h2 className="text-3xl font-extrabold text-brand-accent text-center mb-6">Login</h2>

        {error && (
          <div className="bg-red-600 text-white px-4 py-2 mb-4 rounded text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:ring-2 focus:ring-brand-accent"
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:ring-2 focus:ring-brand-accent"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${loading ? 'bg-gray-600' : 'bg-brand-orange hover:bg-orange-600'} text-white font-semibold py-2 rounded transition duration-300`}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="text-sm text-center text-gray-400 mt-6">
          <Link to="/forgot-password" className="text-brand-accent hover:underline">
            Forgot your password?
          </Link>
        </div>
        <div className="text-sm text-center text-gray-400 mt-2">
          Don't have an account?{' '}
          <Link to="/register" className="text-brand-accent hover:underline">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
