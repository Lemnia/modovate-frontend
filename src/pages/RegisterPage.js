// pages/RegisterPage.js
import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import useCsrfToken from '../hooks/useCsrfToken';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  useCsrfToken();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await axios.post('/api/auth/register', {
        username,
        email,
        password,
        confirmPassword,
      }, { withCredentials: true });

      setMessage(response.data.message);
      setLoading(false);

      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Registration failed.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark px-4">
      <div className="max-w-md w-full bg-brand-black p-8 rounded-lg shadow-md border border-brand-orange">
        <h2 className="text-3xl font-bold text-center text-brand-light mb-6">Create Your Account</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {message && <div className="text-green-500 text-center mb-4">{message}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full px-4 py-2 rounded bg-brand-dark text-white focus:outline-none focus:ring-2 focus:ring-brand-accent"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 rounded bg-brand-dark text-white focus:outline-none focus:ring-2 focus:ring-brand-accent"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded bg-brand-dark text-white focus:outline-none focus:ring-2 focus:ring-brand-accent"
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full px-4 py-2 rounded bg-brand-dark text-white focus:outline-none focus:ring-2 focus:ring-brand-accent"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-orange text-white py-2 rounded hover:bg-orange-600 transition-colors"
          >
            {loading ? <LoadingSpinner /> : 'Register'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-brand-light hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
