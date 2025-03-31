import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirm) {
      setError('All fields are required.');
      return;
    }

    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      if (!res.ok) {
        const { message } = await res.json();
        throw new Error(message || 'Registration failed');
      }

      setSuccessMessage('🎉 Registration successful! Please confirm your email before logging in.');
      setError('');
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirm('');

      // Prebaci na login nakon 4 sekunde
      setTimeout(() => {
        navigate('/login');
      }, 4000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen pt-28 px-6 pb-16 bg-gradient-to-b from-black to-gray-900 text-white flex justify-center items-center">
      <div className="max-w-md w-full space-y-6 bg-white/10 p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-brand-accent">Create Account</h2>

        {error && (
          <p className="bg-red-500/20 text-red-400 text-sm px-4 py-2 rounded text-center">
            {error}
          </p>
        )}

        {successMessage && (
          <p className="bg-green-500/20 text-green-300 text-sm px-4 py-2 rounded text-center">
            {successMessage}
          </p>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-2 rounded-lg bg-white/10 placeholder-gray-400 focus:outline-none"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 rounded-lg bg-white/10 placeholder-gray-400 focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 rounded-lg bg-white/10 placeholder-gray-400 focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full px-4 py-2 rounded-lg bg-white/10 placeholder-gray-400 focus:outline-none"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-brand-accent hover:bg-brand-light text-white font-semibold py-2 rounded-lg transition"
          >
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-400">
          Already have an account?{' '}
          <span
            className="text-brand-orange hover:underline cursor-pointer"
            onClick={() => navigate('/login')}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
