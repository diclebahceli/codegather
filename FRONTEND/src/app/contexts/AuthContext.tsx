// authContext.tsx
"use client";
import React, { createContext, useContext, useState } from "react";
import { User } from "../models/User";

export interface AuthContextType {
  user: User;
  roles: string[];
  setTheUser: (user: User) => void;
  setTheRoles: (roles: string[]) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [roles, setRoles] = useState<string[]>([]);
  const [user, setUser] = useState<User>({
    email: "",
    id: "",
    userName: "",
    profileImage: "",
  });

  const setTheUser = (user: User) => {
    setUser(user);
  };

  const setTheRoles = (roles: string[]) => {
    setRoles(roles);
  };

  const logout = () => {
    setRoles([]);
    setUser({ email: "", id: "", userName: "", profileImage: ""});
  };

  return (
    <AuthContext.Provider
      value={{ user: user, roles: roles, setTheUser, setTheRoles, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

