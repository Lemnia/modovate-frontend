import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const SubscriptionsTab = () => {
  const { token } = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancelId, setCancelId] = useState(null); // za modal

  const getUserIdFromToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userId;
    } catch (err) {
      return null;
    }
  };

  const fetchSubscriptions = async () => {
    setLoading(true);
    setError('');
    const userId = getUserIdFromToken(token);
    if (!userId) {
      setError('Invalid token');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/subscriptions/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
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
  };

  useEffect(() => {
    if (token) fetchSubscriptions();
  }, [token]);

  const confirmCancel = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/subscriptions/${cancelId}/cancel`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to cancel subscription');

      setCancelId(null);
      fetchSubscriptions(); // refreshuj listu
    } catch (err) {
      alert('Cancel failed: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-brand-accent">Your Active Subscriptions</h2>

      {loading ? (
        <p className="text-gray-300">Loading subscriptions...</p>
      ) : error ? (
        <p className="text-red-400">{error}</p>
      ) : subscriptions.length === 0 ? (
        <p className="text-gray-400">You don’t have any active subscriptions yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {subscriptions.map((sub, idx) => (
            <div
              key={idx}
              className="bg-black/40 backdrop-blur border border-brand-orange rounded-xl p-5 shadow space-y-2"
            >
              <h3 className="text-xl font-semibold text-brand-orange">{sub.game}</h3>
              <p className="text-sm text-gray-300">Tier: {sub.tier}</p>
              <p className="text-lg text-brand-light">Subscribed: {new Date(sub.startDate).toLocaleDateString()}</p>

              {sub.status === 'active' ? (
                <button
                  onClick={() => setCancelId(sub._id)}
                  className="mt-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-1.5 px-4 rounded-full"
                >
                  Cancel Subscription
                </button>
              ) : (
                <p className="text-red-400 font-semibold">Cancelled</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal za potvrdu */}
      {cancelId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-lg space-y-4 w-full max-w-sm">
            <h3 className="text-lg font-bold">Confirm Cancellation</h3>
            <p>Are you sure you want to cancel this subscription?</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setCancelId(null)}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-1.5 rounded"
              >
                No
              </button>
              <button
                onClick={confirmCancel}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded"
              >
                Yes, Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionsTab;
