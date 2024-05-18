// authContext.tsx
"use client";
import React, { createContext, useState } from "react";
import { UserDto } from "../models/UserDto";

export interface AuthContextType {
  user: UserDto;
  roles: string[];
  loginn: (user: UserDto, roles: string[]) => void;
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
  });

  const loginn = (user: UserDto, roles: string[]) => {
    setRoles(roles);
    setUser(user);
  };

  const logout = () => {
    setRoles([]);
    setUser({ email: "", id: "", userName: "" });
  };

  return (
    <AuthContext.Provider value={{ user: user, roles: roles, loginn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
