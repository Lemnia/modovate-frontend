import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AlreadyVerifiedPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 6000); // 6 sekundi

    return () => clearTimeout(timer); // čisti timer ako korisnik napusti stranicu
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-gray-900 px-4">
      <div className="max-w-md w-full bg-[#111418] p-8 rounded-lg shadow-lg text-center border border-brand-orange">
        <h2 className="text-3xl font-bold text-brand-accent mb-6">Email Already Confirmed</h2>
        <p className="text-gray-300 mb-8">
          Your email address has already been confirmed. You will be redirected to login shortly...
        </p>
        <p className="text-gray-500 text-sm">If you are not redirected, <a href="/login" className="text-brand-accent hover:underline">click here</a>.</p>
      </div>
    </div>
  );
};

export default AlreadyVerifiedPage;
