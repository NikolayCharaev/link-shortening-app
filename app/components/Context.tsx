'use client';
import { createContext, ReactNode, useContext, FC, useState, useEffect } from 'react';

interface AuthContextProps {
  children: ReactNode;
}

interface AuthContextValue {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
  token?: string;
  setToken : any
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const Context: FC<AuthContextProps> = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const [token, setToken] = useState<string>('');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedToken = localStorage.getItem('token');
      setToken(storedToken || '');
    }
  }, [token]);

  const contextValue: AuthContextValue = {
    isAuthenticated,
    setAuthenticated,
    token,
    setToken
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default Context;
