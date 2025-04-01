import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const CheckoutPage = () => {
  const { cartItems, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardInfo, setCardInfo] = useState({
    name: '',
    number: '',
    expiry: '',
    cvv: '',
  });
  const [redeemCode, setRedeemCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price.replace('$', '').replace('/mo', ''));
    return total + price;
  }, 0);

  const handlePurchase = async () => {
    if (!paymentMethod) {
      setError('Please select a payment method.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/subscriptions/user/me', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) throw new Error('Failed to fetch current subscriptions');

      const existingSubs = await res.json();

      const newSubs = cartItems.filter(
        (item) =>
          !existingSubs.some(
            (sub) => sub.tier === item.tierId && sub.game === item.game
          )
      );

      for (let sub of newSubs) {
        const createRes = await fetch('/api/subscriptions', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tier: sub.tierId,
            game: sub.game,
            paymentMethod,
          }),
        });

        if (!createRes.ok) {
          throw new Error(`Failed to create subscription for ${sub.tierId}`);
        }
      }

      clearCart();
      navigate('/thank-you');
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {cartItems.length === 0 ? (
        <p>
          Your cart is empty. <Link to="/subscription" className="text-brand-accent underline">Choose a plan.</Link>
        </p>
      ) : (
        <>
          <ul className="mb-6 space-y-4">
            {cartItems.map((item, index) => (
              <li key={index} className="bg-white bg-opacity-5 p-4 rounded-xl shadow">
                <p className="font-semibold">{item.game} – {item.name} Tier</p>
                <p>{item.price}</p>
              </li>
            ))}
          </ul>

          <div className="mb-6">
            <label className="block mb-2">Select Payment Method:</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2 bg-white bg-opacity-10 rounded"
            >
              <option value="">-- Select --</option>
              <option value="card">Credit/Debit Card</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>

          {paymentMethod === 'card' && (
            <div className="mb-6 space-y-3">
              <input
                type="text"
                placeholder="Name on Card"
                value={cardInfo.name}
                onChange={(e) => setCardInfo({ ...cardInfo, name: e.target.value })}
                className="w-full p-2 bg-white bg-opacity-10 rounded"
              />
              <input
                type="text"
                placeholder="Card Number"
                value={cardInfo.number}
                onChange={(e) => setCardInfo({ ...cardInfo, number: e.target.value })}
                className="w-full p-2 bg-white bg-opacity-10 rounded"
              />
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder="Expiry"
                  value={cardInfo.expiry}
                  onChange={(e) => setCardInfo({ ...cardInfo, expiry: e.target.value })}
                  className="w-full p-2 bg-white bg-opacity-10 rounded"
                />
                <input
                  type="text"
                  placeholder="CVV"
                  value={cardInfo.cvv}
                  onChange={(e) => setCardInfo({ ...cardInfo, cvv: e.target.value })}
                  className="w-full p-2 bg-white bg-opacity-10 rounded"
                />
              </div>
            </div>
          )}

          {error && <p className="text-red-500 mb-4">{error}</p>}

          <div className="flex justify-between items-center">
            <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
            <button
              onClick={handlePurchase}
              disabled={loading}
              className="px-6 py-3 bg-brand-orange text-white rounded-xl hover:bg-opacity-80 transition"
            >
              {loading ? 'Processing...' : 'Confirm Purchase'}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;