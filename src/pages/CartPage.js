import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const getTotal = () => {
    return cartItems
      .reduce((acc, item) => {
        const numericPrice = parseFloat(item.price.replace(/[^0-9.]/g, ''));
        return acc + numericPrice;
      }, 0)
      .toFixed(2);
  };

  return (
    <div className="min-h-screen bg-[#0b0d10] text-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Back to subscriptions */}
        <Link
          to="/subscriptions"
          className="inline-block mb-6 text-brand-accent hover:underline hover:text-brand-light transition"
        >
          ← Back to Subscriptions
        </Link>

        {/* Title */}
        <h2 className="text-4xl font-bold mb-10 text-center text-brand-orange">Your Cart</h2>

        {cartItems.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">Your cart is currently empty.</p>
        ) : (
          <>
            {/* Items */}
            <div className="space-y-6 mb-10">
              {cartItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center bg-black/40 border border-brand-orange rounded-xl p-5"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-brand-orange">{item.name}</h3>
                    <p className="text-sm text-gray-300">{item.tierId}</p>
                    <p className="text-lg font-medium text-brand-light mt-1">{item.price}</p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.tierId)}
                    className="text-sm bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full text-white transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            {/* Total & actions */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <h3 className="text-2xl font-bold text-white">
                Total:{' '}
                <span className="text-brand-accent">${getTotal()}</span>
              </h3>
              <div className="flex gap-4">
                <button
                  onClick={clearCart}
                  className="bg-gray-700 hover:bg-gray-800 px-5 py-2 rounded-full text-white transition"
                >
                  Clear Cart
                </button>
                <button
                  onClick={() => navigate('/checkout')}
                  className="bg-brand-accent hover:bg-[#00a3a3] px-6 py-2 rounded-full text-white font-semibold transition"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
