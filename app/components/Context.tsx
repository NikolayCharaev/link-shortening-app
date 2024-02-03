'use client';
import { createContext, ReactNode, useContext, FC, useState } from 'react';
interface AuthContextProps {
  children: ReactNode;
}

interface AuthContextValue {
  isAuthenticated: boolean;
  setAuthenticated: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const Context = (FC<AuthContextProps> = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
});

export default Context;
