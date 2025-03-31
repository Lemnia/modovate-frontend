import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const simsTiers = [
  {
    name: 'Starter',
    price: '$2.99/mo',
    features: ['1 exclusive item per month', 'Basic accessories', 'Support modder'],
    tierId: 'sims-starter',
  },
  {
    name: 'Premium',
    price: '$4.99/mo',
    features: ['3-5 exclusive items/month', 'Early access to content', 'Clothing + animations'],
    tierId: 'sims-premium',
  },
  {
    name: 'Elite',
    price: '$7.99/mo',
    features: ['All Premium features', 'Exclusive packs', 'Behind the scenes content', 'Priority requests'],
    tierId: 'sims-elite',
  },
];

const SimsSubscriptionSection = () => {
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();

  const isInCart = (tierId) => cartItems.some((item) => item.tierId === tierId);

  return (
    <section className="bg-[#0b0d10] py-16 px-6 text-white">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 tracking-wide text-brand-accent">
          The Sims – Subscription Tiers
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Choose a tier that fits your style and unlock premium content made exclusively for The Sims.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {simsTiers.map((tier, idx) => (
          <div
            key={idx}
            className="bg-black/40 backdrop-blur border-2 border-brand-orange rounded-xl p-6 shadow hover:shadow-[0_0_14px_#F47800] transition min-h-[320px] flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-bold text-brand-orange mb-2">{tier.name}</h3>
              <p className="text-xl font-semibold text-brand-light mb-4">{tier.price}</p>
              <ul className="text-left space-y-2 mb-2 text-sm text-gray-300">
                {tier.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-brand-accent">✔</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              {isInCart(tier.tierId) ? (
                <button
                  onClick={() => removeFromCart(tier.tierId)}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-full transition w-full"
                >
                  Remove from Cart
                </button>
              ) : (
                <button
                  onClick={() => addToCart(tier)}
                  className="bg-brand-accent hover:bg-[#00a3a3] text-white font-semibold px-5 py-2 rounded-full transition w-full"
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {cartItems.length > 0 && (
        <div className="text-center mt-12 flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => window.confirm('Are you sure you want to clear the cart?') && clearCart()}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full transition"
          >
            Clear Cart
          </button>
          <Link
            to="/cart"
            className="bg-brand-orange hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-full transition"
          >
            Go to Cart ({cartItems.length})
          </Link>
        </div>
      )}
    </section>
  );
};

export default SimsSubscriptionSection;
