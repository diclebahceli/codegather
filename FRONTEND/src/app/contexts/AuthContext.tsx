// authContext.tsx
"use client";
import React, { createContext, useState } from "react";

export interface AuthContextType {
  role: string | null;
  loginn: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<string | null>(null);

  const loginn = (newToken: string) => {
    setRole(newToken);
  };

  const logout = () => {
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ role: role, loginn: loginn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
