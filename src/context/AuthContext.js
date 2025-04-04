import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkLoginStatus = async () => {
    try {
      const res = await fetch('/api2/auth/status', {
        credentials: 'include',
      });
      const data = await res.json();
      setIsAuthenticated(data.isLoggedIn);
    } catch (err) {
      setIsAuthenticated(false);
    }
  };

  const fetchCsrfToken = async () => {
    try {
      // Append a cache-busting query string to force a fresh response
      await fetch('/api2/auth/csrf-token?nocache=' + Date.now(), {
        credentials: 'include',
      });
    } catch (err) {
      console.error('Failed to fetch CSRF token:', err);
    }
  };

  useEffect(() => {
    checkLoginStatus();
    fetchCsrfToken();
  }, []);

  const login = () => setIsAuthenticated(true);
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
