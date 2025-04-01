import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const totalPrice = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price.replace('$', '').replace('/mo', ''));
    return total + price;
  }, 0);

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 text-white">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to="/subscription" className="text-brand-accent underline">Go to Subscriptions</Link></p>
      ) : (
        <>
          <ul className="mb-6 space-y-4">
            {cartItems.map((item, index) => (
              <li key={index} className="bg-white bg-opacity-5 p-4 rounded-xl shadow flex justify-between items-center">
                <div>
                  <p className="font-semibold">{item.game} – {item.name} Tier</p>
                  <p>{item.price}</p>
                </div>
                <button
                  onClick={() => removeFromCart(index)}
                  className="text-red-500 hover:text-red-400"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="flex justify-between items-center">
            <p className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</p>
            <div className="flex gap-4">
              <button
                onClick={clearCart}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition"
              >
                Clear Cart
              </button>
              <Link
                to="/checkout"
                className="px-6 py-2 bg-brand-orange text-white rounded-xl hover:bg-opacity-80 transition"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;