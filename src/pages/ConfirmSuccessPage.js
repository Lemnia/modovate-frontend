import React from 'react';
import { useNavigate } from 'react-router-dom';

const ConfirmSuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col justify-center items-center pt-28 px-6">
      <div className="bg-white/10 p-10 rounded-xl text-center shadow-lg max-w-md">
        <h1 className="text-3xl font-bold text-brand-accent mb-4">✅ Email Confirmed</h1>
        <p className="text-gray-300 mb-6">
          Your email has been successfully confirmed. You can now log in to your account!
        </p>
        <button
          onClick={() => navigate('/login')}
          className="bg-brand-accent hover:bg-brand-light text-white font-semibold px-6 py-2 rounded-full transition"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default ConfirmSuccessPage;
