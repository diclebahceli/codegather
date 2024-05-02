// authContext.tsx
"use client";
import React, { createContext, useState } from "react";

export interface AuthContextType {
  roles: string[];
  loginn: (roles: string[]) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [roles, setRoles] = useState<string[]>([]);

  const loginn = (roles: string[]) => {
    setRoles(roles);
  };

  const logout = () => {
    setRoles([]);
  };

  return (
    <AuthContext.Provider value={{ roles: roles, loginn: loginn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
