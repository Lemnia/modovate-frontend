import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="min-h-screen pt-28 px-4 sm:px-6 lg:px-14 pb-16 bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="max-w-5xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold mb-6 text-brand-accent text-center">Your Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center text-gray-400 text-lg">
            Your cart is currently empty.
          </div>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center justify-between bg-white/10 rounded-xl p-6 shadow-lg"
              >
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-2xl font-semibold">{item.name}</h2>
                  <p className="text-gray-400 text-lg">${item.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => removeFromCart(item)}
                  className="mt-4 sm:mt-0 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded transition font-medium"
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="bg-white/10 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between">
              <p className="text-2xl font-bold text-brand-orange mb-4 sm:mb-0">
                Total: ${total.toFixed(2)}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={clearCart}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded transition font-medium"
                >
                  Clear Cart
                </button>
                <Link
                  to="/checkout"
                  className="bg-brand-accent hover:bg-teal-500 text-white px-6 py-2 rounded transition font-medium text-center"
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
