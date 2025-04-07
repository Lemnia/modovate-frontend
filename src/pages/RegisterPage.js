import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const res = await fetch('/api-proxy/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Registration failed.');
      } else {
        setSuccessMessage('Registration successful! Please check your email to verify your account.');
        setFormData({ username: '', email: '', password: '' });

        // Ako želiš automatsko prebacivanje posle 5 sekundi:
        setTimeout(() => {
          navigate('/login');
        }, 5000);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 px-4">
      <div className="max-w-md w-full bg-[#111418] p-8 rounded-lg shadow-lg border border-brand-orange">
        <h2 className="text-3xl font-bold text-center text-brand-accent mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password (min 6 characters)"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400"
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-brand-orange hover:bg-orange-600 text-white font-semibold rounded transition duration-300"
          >
            Register
          </button>
        </form>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {successMessage && (
          <p className="text-green-400 text-center mt-4">{successMessage}</p>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
