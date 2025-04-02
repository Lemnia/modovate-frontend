import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo/Logotip_transparent_notext.png';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleAccountClick = () => {
    navigate('/account');
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-black bg-opacity-70 backdrop-blur-md z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-14 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Modovate Studio" className="h-10" />
        </Link>
        <nav className="flex items-center space-x-6">
          <Link to="/" className="hover:text-gray-300 transition">
            Home
          </Link>
          <Link to="/subscriptions" className="hover:text-gray-300 transition">
            Subscriptions
          </Link>
          <Link to="/about" className="hover:text-gray-300 transition">
            About
          </Link>

          {!isLoggedIn && (
            <>
              <Link to="/login" className="hover:text-gray-300 transition">
                Login
              </Link>
              <Link to="/register" className="hover:text-gray-300 transition">
                Register
              </Link>
            </>
          )}

          {isLoggedIn && (
            <>
              <button
                onClick={handleAccountClick}
                className="hover:text-gray-300 transition bg-transparent text-white"
              >
                My Account
              </button>
              <button
                onClick={handleLogout}
                className="hover:text-gray-300 transition bg-transparent text-white"
              >
                Logout
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
