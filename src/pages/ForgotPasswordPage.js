import React, { credentials: 'include', useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const // Validation
handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email.');
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error('Failed to send reset link.');

      setSubmitted(true);
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center px-4 py-20">
      <div className="w-full max-w-md bg-[#111418] rounded-lg shadow-lg p-8 border border-brand-orange">
        <h2 className="text-3xl font-extrabold text-brand-accent text-center mb-6">Reset Password</h2>

        {submitted ? (
          <div className="text-green-400 bg-green-600/20 px-4 py-2 text-sm rounded text-center">
            If an account with that email exists, a reset link has been sent.
          </div>
        ) : (
          <>
            {error && (
              <div className="bg-red-500/20 text-red-400 text-sm px-4 py-2 rounded text-center mb-4">
                {error}
              </div>
            )}
            <form onSubmit={// Validation
handleSubmit} className="space-y-5">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded text-white focus:ring-2 focus:ring-brand-accent"
              />
              <button
                type="submit"
                className="w-full bg-brand-orange hover:bg-orange-600 text-white font-semibold py-2 rounded"
              >
                Send Reset Link
              </button>
            </form>
          </>
        )}

        <div className="text-sm text-center text-gray-400 mt-6">
          Back to{' '}
          <Link to="/login" className="text-brand-accent hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
