import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { MOCK_USER } from '../_mock';
import type { User } from '../_mock';

interface AuthContextType {
  user: User | null;
  updateUser: (updates: Partial<User>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('foodshare_user');
    return savedUser ? JSON.parse(savedUser) : MOCK_USER;
  });


  useEffect(() => {
    if (user) {
      localStorage.setItem('foodshare_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('foodshare_user');
    }
  }, [user]);

  const updateUser = (updates: Partial<User>) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : null));
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};