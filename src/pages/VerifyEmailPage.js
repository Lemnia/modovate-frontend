import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const VerifyEmailPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const res = await fetch(`/api-proxy/auth/verify-email/${token}`);
        const data = await res.json();

        if (res.ok) {
          setStatus('success');
          setMessage(data.message);
        } else {
          if (data.message === 'Email already confirmed.') {
            // 👇 Ako je email već potvrđen, šaljemo korisnika na posebnu stranicu
            navigate('/already-verified');
          } else {
            setStatus('error');
            setMessage(data.message || 'Verification failed.');
          }
        }
      } catch (error) {
        setStatus('error');
        setMessage('Verification failed.');
      }
    };

    verifyEmail();
  }, [token, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 px-4">
      <div className="max-w-md w-full bg-[#111418] p-8 rounded-lg shadow-lg text-center border border-brand-orange">
        <h2 className="text-3xl font-bold text-brand-accent mb-6">
          {status === 'loading' ? 'Verifying Email...' : 'Email Verification'}
        </h2>
        <p className={`text-gray-300 mb-8 ${status === 'error' ? 'text-red-500' : ''}`}>
          {message}
        </p>
        {status === 'success' && (
          <Link
            to="/login"
            className="inline-block bg-brand-orange hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded transition duration-300"
          >
            Go to Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
