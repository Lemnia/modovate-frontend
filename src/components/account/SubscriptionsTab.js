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
        credentials: 'include',
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

      fetchSubscriptions();
    } catch (err) {
      setError(err.message);
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
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
            <li
              key={sub._id}
              className="bg-white bg-opacity-5 p-4 rounded-xl shadow relative group"
              title={`Status: ${sub.status.toUpperCase()} | Expires on ${formatDate(sub.expiresAt)}`}
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <div>
                  <p className="font-bold text-lg mb-1">{sub.game}</p>
                  <p className="text-sm text-gray-300 mb-1">Tier: {sub.tier}</p>
                  <p className="text-sm text-gray-400 mb-1">
                    Status:{' '}
                    <span
                      className={`capitalize ${
                        sub.status === 'active'
                          ? 'text-green-400'
                          : sub.status === 'canceled'
                          ? 'text-yellow-400'
                          : 'text-red-400'
                      }`}
                    >
                      {sub.status}
                    </span>
                  </p>
                  <p className="text-sm text-gray-400 mb-1">
                    Start: {formatDate(sub.startDate)}
                  </p>
                  <p className="text-sm text-gray-400 mb-1">
                    Expires: {formatDate(sub.expiresAt)}
                  </p>
                  {sub.stripeSubscriptionId && (
                    <p className="text-xs text-gray-500 break-all mt-1">
                      Stripe ID: {sub.stripeSubscriptionId}
                    </p>
                  )}
                </div>

                {sub.status === 'active' && (
                  <button
                    onClick={() => handleCancel(sub._id)}
                    className="mt-4 sm:mt-0 px-4 py-2 bg-brand-orange text-white rounded-lg hover:bg-opacity-80 transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SubscriptionsTab;
