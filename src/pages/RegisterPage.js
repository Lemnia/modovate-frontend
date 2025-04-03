import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { username, email, password } = formData;

    if (!username || username.length < 3) {
      setError('Username must be at least 3 characters.');
      setLoading(false);
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email.');
      setLoading(false);
      return;
    }

    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters.');
      setLoading(false);
      return;
    }

    try {
      await fetch(`${process.env.REACT_APP_API_URL}/api/auth/status`, {
        method: 'GET',
        credentials: 'include',
      });

      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Registration failed');

      setSuccess(data.message || 'Registration successful');
      setTimeout(() => navigate('/login'), 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md bg-[#111418] rounded-lg shadow-lg p-8 border border-brand-orange">
        <h2 className="text-3xl font-extrabold text-brand-accent text-center mb-6">Register</h2>

        {error && <div className="bg-red-600 text-white px-4 py-2 mb-4 rounded text-sm">{error}</div>}
        {success && <div className="bg-green-600 text-white px-4 py-2 mb-4 rounded text-sm">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:ring-2 focus:ring-brand-accent"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:ring-2 focus:ring-brand-accent"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:ring-2 focus:ring-brand-accent"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-orange hover:bg-orange-600 text-white font-semibold py-2 rounded transition"
          >
            {loading ? 'Registering...' : 'Register'}
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
