// authContext.tsx
"use client";
import React, { createContext, useState } from "react";
import { UserDto } from "../models/UserDto";

export interface AuthContextType {
  user: UserDto;
  roles: string[];
  setTheUser: (user: UserDto) => void;
  setTheRoles: (roles: string[]) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [roles, setRoles] = useState<string[]>([]);
  const [user, setUser] = useState<UserDto>({
    email: "",
    id: "",
    userName: "",
    profileImage: "",
  });

  const setTheUser = (user: UserDto) => {
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
