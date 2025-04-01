import React, { useEffect, useState, useCallback } from 'react';

const SubscriptionsTab = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchSubscriptions = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/subscriptions/user/me', {
        method: 'GET',
        credentials: 'include', // Neophodno za httpOnly cookie
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) throw new Error('Failed to fetch subscriptions');

      const data = await res.json();
      setSubscriptions(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleCancel = async (subscriptionId) => {
    try {
      const res = await fetch(`/api/subscriptions/${subscriptionId}/cancel`, {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) throw new Error('Failed to cancel subscription');

      // Refresh list
      fetchSubscriptions();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Your Subscriptions</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : subscriptions.length === 0 ? (
        <p>You have no active subscriptions.</p>
      ) : (
        <ul className="space-y-4">
          {subscriptions.map((sub) => (
            <li key={sub._id} className="bg-white bg-opacity-5 p-4 rounded-xl shadow">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold">{sub.game}</p>
                  <p className="text-sm text-gray-300">Tier: {sub.tier}</p>
                </div>
                <button
                  onClick={() => handleCancel(sub._id)}
                  className="px-4 py-2 bg-brand-orange text-white rounded-lg hover:bg-opacity-80 transition"
                >
                  Cancel
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SubscriptionsTab;
