import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const secondLifeTiers = [
  {
    name: 'Virtual Essentials',
    price: '$2.79/mo',
    features: ['Starter furniture', 'Clothing & hair', 'Basic animations'],
    tierId: 'secondlife-essentials',
  },
  {
    name: 'Fashionista Pack',
    price: '$5.99/mo',
    features: ['Custom skins', 'Full avatar bundles', 'Fashion accessories'],
    tierId: 'secondlife-fashionista',
  },
  {
    name: 'World Builder',
    price: '$9.99/mo',
    features: ['All Fashionista content', 'World environment tools', 'Buildings + terrains', 'Exclusive templates'],
    tierId: 'secondlife-worldbuilder',
  },
];

const SecondLifeSubscriptionSection = () => {
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();
  const isInCart = (tierId) => cartItems.some((item) => item.tierId === tierId);

  return (
    <section className="bg-[#0b0d10] py-16 px-6 text-white">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4 tracking-wide text-brand-accent">
          Second Life – Subscription Tiers
        </h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Expand your Second Life with lifestyle upgrades, avatar skins, and building kits.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {secondLifeTiers.map((tier, idx) => (
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

export default SecondLifeSubscriptionSection;
