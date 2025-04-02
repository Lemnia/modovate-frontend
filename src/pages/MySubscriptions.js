// src/pages/MySubscriptions.js
import React, { useEffect, useState } from 'react';

const MySubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const res = await fetch('/api/subscriptions/user/me', {
          credentials: 'include'
        });
        const data = await res.json();

        if (!res.ok) throw new Error(data.error || 'Failed to fetch subscriptions');

        setSubscriptions(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, []);

  if (loading) return <p className="text-white p-4">Loading subscriptions...</p>;
  if (error) return <p className="text-red-400 p-4">{error}</p>;
  if (subscriptions.length === 0) return <p className="text-white p-4">You have no active subscriptions.</p>;

  return (
    <div className="min-h-screen pt-28 px-4 sm:px-6 lg:px-14 pb-16 bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">My Subscriptions</h2>
        <div className="space-y-4">
          {subscriptions.map((sub) => (
            <div
              key={sub._id}
              className="bg-white/10 p-4 rounded-xl shadow flex flex-col sm:flex-row sm:justify-between"
            >
              <div>
                <p className="font-semibold">Game: {sub.game}</p>
                <p>Tier: {sub.tier}</p>
                <p>Status: {sub.status}</p>
              </div>
              <div className="text-sm text-gray-300 sm:text-right">
                <p>Started: {new Date(sub.startDate).toLocaleDateString()}</p>
                <p>Expires: {new Date(sub.expiresAt).toLocaleDateString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MySubscriptions;