// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api-proxy/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ username, email, password }), // TAČNO ovako backend očekuje
      });

      const data = await res.json();
      if (res.ok) {
        setMessage('Registration successful! Please check your email to verify your account.');
        setUsername('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 px-4">
      <div className="max-w-md w-full bg-[#111418] p-8 rounded-lg shadow-lg border border-brand-orange">
        <h2 className="text-3xl font-bold text-brand-accent mb-6 text-center">Create an Account</h2>

        {error && (
          <div className="bg-red-600 text-white text-sm rounded-md px-4 py-2 mb-4 text-center">
            {error}
          </div>
        )}
        {message && (
          <div className="bg-green-700 text-white text-sm rounded-md px-4 py-2 mb-4 text-center">
            {message}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full mb-4 px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-brand-orange"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-brand-orange"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-brand-orange"
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full mb-6 px-4 py-2 rounded bg-gray-800 text-white border border-gray-600 focus:outline-none focus:border-brand-orange"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 rounded text-white font-semibold transition duration-300 ${
              loading
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-brand-orange hover:bg-orange-600'
            }`}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-400 text-center">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-orange hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
