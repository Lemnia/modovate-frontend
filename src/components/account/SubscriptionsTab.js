import React, { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../../context/AuthContext';

const SubscriptionsTab = () => {
  const { token } = useAuth();
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getUserIdFromToken = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
          .join('')
      );
      return JSON.parse(jsonPayload).id;
    } catch (e) {
      return null;
    }
  };

  const fetchSubscriptions = useCallback(async () => {
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
  }, [token]);

  const handleCancel = async (subscriptionId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/subscriptions/${subscriptionId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to cancel subscription');
      fetchSubscriptions();
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (token) fetchSubscriptions();
  }, [token, fetchSubscriptions]);

  if (loading) {
    return <div className="text-white mt-4">Loading subscriptions...</div>;
  }

  if (error) {
    return <div className="text-red-500 mt-4">{error}</div>;
  }

  if (subscriptions.length === 0) {
    return <div className="text-white mt-4">You have no active subscriptions.</div>;
  }

  return (
    <div className="space-y-6 mt-6">
      {subscriptions.map((sub) => (
        <div
          key={sub._id}
          className="bg-white/5 backdrop-blur-md p-6 rounded-xl border border-brand-accent flex justify-between items-center"
        >
          <div>
            <h3 className="text-xl font-semibold text-white">{sub.game}</h3>
            <p className="text-gray-300 text-sm">Tier: {sub.tier}</p>
            <p className="text-gray-400 text-xs mt-1">
              Subscribed on: {new Date(sub.createdAt).toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={() => handleCancel(sub._id)}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
          >
            Cancel
          </button>
        </div>
      ))}
    </div>
  );
};

export default SubscriptionsTab;
