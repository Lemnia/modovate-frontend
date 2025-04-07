// pages/LoginPage.js
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import useCsrfToken from '../hooks/useCsrfToken';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  useCsrfToken();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post('/api/auth/login', { email, password }, { withCredentials: true });
      await login();
      navigate('/account');
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Login failed.');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark px-4">
      <div className="max-w-md w-full bg-brand-black p-8 rounded-lg shadow-md border border-brand-orange">
        <h2 className="text-3xl font-bold text-center text-brand-light mb-6">Welcome Back</h2>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
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
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-orange text-white py-2 rounded hover:bg-orange-600 transition-colors"
          >
            {loading ? <LoadingSpinner /> : 'Login'}
          </button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-4">
          <Link to="/forgot-password" className="text-brand-light hover:underline">
            Forgot Password?
          </Link>
        </p>
        <p className="text-center text-sm text-gray-400 mt-2">
          Don't have an account?{' '}
          <Link to="/register" className="text-brand-light hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
