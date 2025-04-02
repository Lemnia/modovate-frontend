import React from 'react';
import { Link } from 'react-router-dom';

const ConfirmSuccessPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-14 bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="max-w-md space-y-6">
        <h1 className="text-4xl font-bold text-brand-accent">Thank You!</h1>
        <p className="text-lg text-gray-300">Your order has been confirmed. A confirmation email has been sent to you.</p>
        <Link
          to="/"
          className="inline-block mt-4 bg-brand-orange hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded transition"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ConfirmSuccessPage;
