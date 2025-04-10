
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define user types
export type UserRole = 'student' | 'tutor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  
  // Mock login function
  const login = async (email: string, password: string) => {
    // In a real app, you would call your API here
    // For now, we'll use a mock user
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock users for testing
    const mockUsers = {
      'student@example.com': {
        id: '1',
        name: 'Ali Student',
        email: 'student@example.com',
        role: 'student' as UserRole,
        avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
      },
      'tutor@example.com': {
        id: '2',
        name: 'Fatima Tutor',
        email: 'tutor@example.com',
        role: 'tutor' as UserRole,
        avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
      },
      'admin@example.com': {
        id: '3',
        name: 'Admin User',
        email: 'admin@example.com',
        role: 'admin' as UserRole,
        avatar: 'https://randomuser.me/api/portraits/men/68.jpg'
      }
    };
    
    if (email in mockUsers && password === 'password') {
      setUser(mockUsers[email as keyof typeof mockUsers]);
    } else {
      throw new Error('Invalid credentials');
    }
  };
  
  // Mock signup function
  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    // In a real app, you would call your API here
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create a new user
    const newUser = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      email,
      role,
    };
    
    setUser(newUser);
  };
  
  const logout = () => {
    setUser(null);
  };
  
  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user,
      login,
      signup,
      logout 
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
