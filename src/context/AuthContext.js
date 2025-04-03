import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email, password) => {
    try {
      const res = await fetch('https://modovate-backend.onrender.com/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) throw new Error('Login failed');
      setIsAuthenticated(true);
      return true;
    } catch (err) {
      return false;
    }
  };

  const register = async (email, password) => {
    try {
      const res = await fetch('https://modovate-backend.onrender.com/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) throw new Error('Registration failed');
      return true;
    } catch (err) {
      return false;
    }
  };

  const logout = async () => {
    await fetch('https://modovate-backend.onrender.com/api/auth/logout', {
      method: 'POST',
      credentials: 'include'
    });
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);