import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { email, password } = formData;

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
        credentials: 'include'
      });

      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed');
      }

      setSuccess(data.message || 'Login successful');
      login();
      setTimeout(() => navigate('/account'), 1000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 text-white">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 bg-white/5 p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 bg-black bg-opacity-20 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full p-2 bg-black bg-opacity-20 rounded"
        />
        <button type="submit" disabled={loading} className="w-full p-2 bg-brand-orange rounded hover:bg-opacity-80 transition">
          {loading ? 'Logging in...' : 'Login'}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        {success && <p className="text-green-400 text-sm">{success}</p>}
        <div className="text-sm mt-2 text-center">
          Don’t have an account?{' '}
          <Link to="/register" className="text-brand-light hover:underline">
            Register here
          </Link>
        </div>
        <div className="text-sm mt-1 text-center">
          <Link to="/forgot-password" className="text-brand-light hover:underline">
            Forgot your password? Reset it
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;