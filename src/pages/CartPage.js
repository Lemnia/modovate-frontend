import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="min-h-screen pt-28 px-4 sm:px-6 lg:px-14 pb-16 bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map((item, index) => (
              <div key={index} className="flex flex-col sm:flex-row items-center justify-between bg-white/10 rounded-xl p-4 shadow">
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-400">${item.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item)}
                  className="mt-2 sm:mt-0 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="flex flex-col sm:flex-row justify-between items-center bg-white/10 p-4 rounded-xl">
              <p className="text-xl font-bold mb-2 sm:mb-0">Total: ${total.toFixed(2)}</p>
              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={clearCart}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
                >
                  Clear Cart
                </button>
                <Link
                  to="/checkout"
                  className="bg-brand-orange hover:bg-orange-600 text-white px-4 py-2 rounded transition text-center"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
