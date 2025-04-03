import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const csrfToken = getCookie('XSRF-TOKEN');

      const response = await fetch('https://modovate-backend.onrender.com/api/auth/register', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          ...(csrfToken && { 'X-XSRF-TOKEN': csrfToken }),
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || 'Registration failed');
      }

      navigate('/login');
    } catch (err) {
      setError(err.message || 'Something went wrong. Try again.');
    }
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return '';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md bg-[#111418] rounded-lg shadow-lg p-8 border border-brand-orange">
        <h2 className="text-3xl font-extrabold text-brand-accent text-center mb-6">Register</h2>
        {error && <div className="bg-red-600 text-white px-4 py-2 mb-4 rounded text-sm">{error}</div>}
        <form onSubmit={handleRegister} className="space-y-5">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:ring-2 focus:ring-brand-accent"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:ring-2 focus:ring-brand-accent"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:ring-2 focus:ring-brand-accent"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:ring-2 focus:ring-brand-accent"
          />
          <button type="submit" className="w-full bg-brand-orange hover:bg-orange-600 text-white font-semibold py-2 rounded">
            Register
          </button>
        </form>
        <div className="text-sm text-center text-gray-400 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-accent hover:underline">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
