import React from 'react';
import { Link } from 'react-router-dom';

const ConfirmSuccessPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center text-white px-6">
      <div className="max-w-md w-full text-center">
        <h1 className="text-4xl font-bold mb-4">Subscription Confirmed!</h1>
        <p className="text-gray-300 mb-6">
          Thank you for confirming your subscription. You now have full access to all premium content.
        </p>
        <Link
          to="/account"
          className="inline-block px-6 py-3 bg-brand-orange text-white rounded-xl hover:bg-opacity-80 transition"
        >
          Go to Account
        </Link>
      </div>
    </div>
  );
};

export default ConfirmSuccessPage;
