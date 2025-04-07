import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        username,
        email,
        password,
        confirmPassword,
      }, { withCredentials: true });

      setSuccessMessage(response.data.message);

      setTimeout(() => {
        navigate('/login');
      }, 3000); // nakon 3 sekunde vodi na login
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0e11]">
      <div className="w-full max-w-md p-8 space-y-6 bg-[#111418] rounded-lg shadow-md border border-[#F47800]">
        <h2 className="text-3xl font-bold text-center text-[#00B8B8]">Create Your Account</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-3 rounded bg-[#0b0e11] text-white border border-gray-700 focus:outline-none focus:border-[#00B8B8]"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded bg-[#0b0e11] text-white border border-gray-700 focus:outline-none focus:border-[#00B8B8]"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded bg-[#0b0e11] text-white border border-gray-700 focus:outline-none focus:border-[#00B8B8]"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full p-3 rounded bg-[#0b0e11] text-white border border-gray-700 focus:outline-none focus:border-[#00B8B8]"
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {successMessage && <p className="text-green-500 text-sm">{successMessage}</p>}

          <button
            type="submit"
            className="w-full bg-[#F47800] hover:bg-orange-600 text-white font-bold py-3 px-6 rounded transition duration-200"
          >
            Register
          </button>
        </form>

        <p className="text-center text-gray-400 text-sm mt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-[#00B8B8] hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
