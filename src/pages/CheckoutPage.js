import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const { token } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardInfo, setCardInfo] = useState({
    name: '',
    number: '',
    expiry: '',
    cvv: '',
  });
  const [redeemCode, setRedeemCode] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price.replace('$', '').replace('/mo', ''));
    return total + price;
  }, 0);

  const getUserIdFromToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userId;
    } catch (err) {
      return null;
    }
  };

  const handlePurchase = async () => {
    if (!paymentMethod) return;
    setLoading(true);

    const userId = getUserIdFromToken(token);
    if (!userId) {
      alert('You must be logged in to complete the purchase.');
      setLoading(false);
      return;
    }

    try {
      // 1. Preuzmi postojeće pretplate
      const res = await fetch(`http://localhost:5000/api/subscriptions/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const existing = res.ok ? await res.json() : [];

      // 2. Filtriraj duplikate
      const newItems = cartItems.filter(
        (item) =>
          !existing.some(
            (sub) =>
              sub.game.toLowerCase() === item.name.toLowerCase() &&
              sub.tier.toLowerCase() === item.tier.toLowerCase() &&
              sub.status === 'active'
          )
      );

      if (newItems.length === 0) {
        alert('You are already subscribed to all selected tiers.');
        setLoading(false);
        return;
      }

      // 3. Dodaj samo nove pretplate
      for (const item of newItems) {
        await fetch('http://localhost:5000/api/subscriptions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId,
            game: item.name,
            tier: item.tier,
          }),
        });
      }

      clearCart();
      navigate('/account');
    } catch (err) {
      console.error('Payment failed:', err);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white pt-[120px] text-center px-6">
        <h1 className="text-3xl font-bold text-brand-accent mb-4">Your cart is empty.</h1>
        <Link
          to="/subscriptions"
          className="text-brand-orange hover:text-orange-500 underline font-medium"
        >
          Browse subscriptions
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white pt-[120px] px-6 pb-28 flex justify-center items-start relative">
      <div className="max-w-xl w-full bg-black/50 backdrop-blur rounded-xl p-10 border border-brand-orange shadow-lg">
        <h1 className="text-4xl font-bold text-brand-orange mb-8 text-center">Checkout</h1>

        {/* Payment Method Selection */}
        <div className="mb-10">
          <h3 className="text-xl font-semibold mb-6 text-center text-white">
            Select your preferred payment method:
          </h3>
          <div className="flex flex-col gap-5">
            {['Card', 'PayPal', 'Redeem Code'].map((method) => (
              <label
                key={method}
                className={`block border rounded-lg transition overflow-hidden ${
                  paymentMethod === method
                    ? 'border-brand-accent bg-brand-accent/20'
                    : 'border-gray-600 hover:border-brand-accent'
                }`}
              >
                <div className="flex items-center gap-4 px-5 py-4 cursor-pointer">
                  <input
                    type="radio"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="accent-brand-accent scale-125"
                  />
                  <span className="text-white text-lg">{method}</span>
                </div>

                <div
                  className={`transition-all duration-500 ease-in-out px-5 ${
                    paymentMethod === method
                      ? 'max-h-[500px] opacity-100 pb-5'
                      : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  {method === 'Card' && (
                    <div className="space-y-4">
                      <input
                        type="text"
                        placeholder="Cardholder Name"
                        value={cardInfo.name}
                        onChange={(e) =>
                          setCardInfo({ ...cardInfo, name: e.target.value })
                        }
                        className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                      />
                      <input
                        type="text"
                        placeholder="Card Number"
                        value={cardInfo.number}
                        onChange={(e) =>
                          setCardInfo({ ...cardInfo, number: e.target.value })
                        }
                        className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                      />
                      <div className="flex gap-4">
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={cardInfo.expiry}
                          onChange={(e) =>
                            setCardInfo({ ...cardInfo, expiry: e.target.value })
                          }
                          className="w-1/2 p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                        />
                        <input
                          type="text"
                          placeholder="CVV"
                          value={cardInfo.cvv}
                          onChange={(e) =>
                            setCardInfo({ ...cardInfo, cvv: e.target.value })
                          }
                          className="w-1/2 p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                        />
                      </div>
                    </div>
                  )}

                  {method === 'Redeem Code' && (
                    <div className="mt-2">
                      <input
                        type="text"
                        placeholder="Enter your code"
                        value={redeemCode}
                        onChange={(e) => setRedeemCode(e.target.value)}
                        className="w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-accent"
                      />
                    </div>
                  )}
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Complete Purchase Button */}
        <div className="text-center">
          <button
            onClick={handlePurchase}
            disabled={!paymentMethod || loading}
            className={`w-full py-3 rounded-full text-lg font-semibold transition ${
              paymentMethod
                ? 'bg-brand-accent hover:bg-[#00a3a3] text-white'
                : 'bg-gray-600 text-gray-300 cursor-not-allowed'
            }`}
          >
            {loading ? 'Processing...' : 'Complete Purchase'}
          </button>
        </div>
      </div>

      {/* Total Price Fixed in Bottom Right */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-4 right-6 bg-black/70 text-white px-6 py-3 rounded-full border border-brand-orange shadow-lg text-lg font-semibold z-50">
          Total: <span className="text-brand-orange">${totalPrice.toFixed(2)}</span>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;
