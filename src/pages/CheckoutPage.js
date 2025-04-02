// CheckoutPage.js
import React from 'react';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
  const { cartItems } = useCart();
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleCheckout = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          priceId: 'bundle_ultimate', // ovo možeš zameniti prema sadržaju korpe
          userId: 'dummy_user_123'
        })
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert('Checkout session error.');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };

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
          <p className="text-sm text-gray-400">You will be redirected to Stripe for secure payment.</p>
          <button
            onClick={handleCheckout}
            className="inline-block bg-brand-accent hover:bg-teal-500 text-white font-semibold px-6 py-2 rounded transition"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;