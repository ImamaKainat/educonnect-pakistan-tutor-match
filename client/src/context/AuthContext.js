
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Check for token on initial load
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setLoading(false);
        return;
      }
      
      try {
        // Set axios default headers
        setAuthToken(token);
        
        const res = await axios.get('/api/auth/user');
        setUser(res.data);
        setIsAuthenticated(true);
      } catch (err) {
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    
    loadUser();
  }, []);
  
  // Login user
  const login = async (email, password) => {
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      
      localStorage.setItem('token', res.data.token);
      setAuthToken(res.data.token);
      setUser(res.data.user);
      setIsAuthenticated(true);
      
      toast.success('Logged in successfully');
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed';
      toast.error(message);
      throw err;
    }
  };
  
  // Register user
  const signup = async (name, email, password, role) => {
    try {
      const res = await axios.post('/api/auth/register', { name, email, password, role });
      
      localStorage.setItem('token', res.data.token);
      setAuthToken(res.data.token);
      setUser(res.data.user);
      setIsAuthenticated(true);
      
      toast.success('Account created successfully');
      return res.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Signup failed';
      toast.error(message);
      throw err;
    }
  };
  
  // Logout user
  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    setUser(null);
    setIsAuthenticated(false);
    toast.info('Logged out successfully');
  };
  
  // Mock login for demo (without API)
  const mockLogin = (email, password) => {
    // Mock users
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
    
    if (email in mockUsers && password === 'password') {
      const user = mockUsers[email];
      setUser(user);
      setIsAuthenticated(true);
      toast.success('Logged in successfully');
      return { user };
    } else {
      toast.error('Invalid credentials');
      throw new Error('Invalid credentials');
    }
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        login,
        signup,
        logout,
        mockLogin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Set auth token for axios
export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};
