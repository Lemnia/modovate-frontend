import React from 'react';
import { motion } from 'framer-motion';

const PaymentTab = () => {
  const paymentMethods = [
    { type: 'Visa', last4: '1234' },
    { type: 'Mastercard', last4: '5678' },
  ];

  return (
    <motion.div
      key="payment"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-brand-accent">Payment Methods</h2>
      <div className="space-y-4">
        {paymentMethods.map((method, idx) => (
          <div key={idx} className="flex justify-between items-center bg-white/10 px-4 py-2 rounded-xl">
            <span>{method.type} **** {method.last4}</span>
            <button className="text-red-400 hover:text-red-600 font-medium">Remove</button>
          </div>
        ))}
      </div>
      <button className="bg-brand-accent hover:bg-teal-600 text-white px-4 py-2 rounded-full">
        Add New Card
      </button>
    </motion.div>
  );
};

export default PaymentTab;
