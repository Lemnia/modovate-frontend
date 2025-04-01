import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-black bg-opacity-80 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center text-white">
        <Link to="/" className="text-2xl font-bold tracking-wide text-brand-accent">
          Modovate
        </Link>

        <nav className="flex items-center gap-6">
          <Link to="/games" className="hover:text-brand-accent transition">Games</Link>
          <Link to="/mods" className="hover:text-brand-accent transition">Mods</Link>
          <Link to="/about" className="hover:text-brand-accent transition">About</Link>
          {isLoggedIn ? (
            <>
              <Link to="/account" className="hover:text-brand-accent transition">Account</Link>
              <button onClick={handleLogout} className="text-red-500 hover:text-red-400 transition">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="hover:text-brand-accent transition">Login</Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
