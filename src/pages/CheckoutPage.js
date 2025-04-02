import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
  const { cartItems } = useCart();
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="min-h-screen pt-28 px-4 sm:px-6 lg:px-14 pb-16 bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold mb-4">Checkout</h1>

        <div className="bg-white/10 rounded-xl p-6 shadow space-y-4">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <ul className="space-y-2">
            {cartItems.map((item, index) => (
              <li key={index} className="flex justify-between text-sm">
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-between font-bold border-t border-white/20 pt-2">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-6 shadow space-y-4">
          <h2 className="text-xl font-semibold">Payment Info</h2>
          <p className="text-sm text-gray-400">This is a demo checkout. Payment processing is not enabled.</p>
          <Link
            to="/confirm"
            className="inline-block bg-brand-accent hover:bg-teal-500 text-white font-semibold px-6 py-2 rounded transition"
          >
            Confirm Order
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
