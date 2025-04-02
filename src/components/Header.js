import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { cartItems } = useCart();
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleAccountClick = (e) => {
    e.preventDefault();
    if (isLoggedIn) {
      navigate('/account');
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="w-full fixed top-0 left-0 flex items-center justify-between px-14 py-3 z-50 bg-black/60 backdrop-blur-sm">
      <div className="flex items-center h-16">
        <Link to="/">
          <img
            src="/assets/logo/Logotip_transparent_text.png"
            alt="Modovate Studio Logo"
            className="h-20 w-20 object-contain transition-transform hover:scale-105"
          />
        </Link>
      </div>

      <div className="flex items-center space-x-10">
        <nav className="flex space-x-8 text-white text-lg font-medium">
          <Link to="/" className="hover:text-gray-300 transition">Home</Link>
          <Link to="/subscriptions" className="hover:text-gray-300 transition">Subscriptions</Link>
          <a
            href="/account"
            onClick={handleAccountClick}
            className="hover:text-gray-300 transition"
          >
            My Account
          </a>
          <Link to="/about" className="hover:text-gray-300 transition">About</Link>
        </nav>

        <Link
          to="/cart"
          className="relative bg-brand-accent hover:bg-[#00a3a3] text-white font-semibold px-5 py-2 rounded-full transition"
        >
          Cart
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-3 bg-brand-orange text-xs px-2 py-0.5 rounded-full">
              {cartItems.length}
            </span>
          )}
        </Link>

        {!isLoggedIn ? (
          <Link
            to="/login"
            className="bg-brand-orange hover:bg-orange-600 text-white font-semibold px-5 py-2 rounded-full transition"
          >
            Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-full transition"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
