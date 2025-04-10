
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    
    setLoading(false);
  }, []);

  // Register user
  const signup = async (name, email, password, role) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password, role })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      setUser(data.user);
      setIsAuthenticated(true);
      
      return data;
    } catch (error) {
      throw error;
    }
  };

  // Login user
  const login = async (email, password) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }
      
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      setUser(data.user);
      setIsAuthenticated(true);
      
      return data;
    } catch (error) {
      throw error;
    }
  };

  // Mock login for demo purposes
  const mockLogin = (email, password) => {
    // Mock user data
    const mockUsers = {
      'student@example.com': {
        id: '1',
        name: 'Ali Student',
        email: 'student@example.com',
        role: 'student',
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      'tutor@example.com': {
        id: '2',
        name: 'Fatima Tutor',
        email: 'tutor@example.com',
        role: 'tutor',
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
      },
      'admin@example.com': {
        id: '3',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin',
        avatar: 'https://randomuser.me/api/portraits/men/68.jpg'
      }
    };

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if user exists in our mock data
        if (mockUsers[email] && password === 'password') {
          const user = mockUsers[email];
          
          // Store user data in localStorage
          localStorage.setItem('user', JSON.stringify(user));
          localStorage.setItem('token', 'mock-jwt-token');
          
          setUser(user);
          setIsAuthenticated(true);
          
          resolve({ user });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500); // Simulate network delay
    });
  };

  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        signup,
        login,
        mockLogin,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
