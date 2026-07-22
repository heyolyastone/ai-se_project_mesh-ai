import { useState } from "react";
import type { ReactNode } from "react";
import type { CurrentUser } from "../types";
import { AuthContext } from "./AuthContext";

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function login(token: string, user: CurrentUser) {
    localStorage.setItem("auth-token", token);
    setIsAuthenticated(true);
    setCurrentUser(user);
  }

  function logout() {
    localStorage.removeItem("auth-token");
    setIsAuthenticated(false);
    setCurrentUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ currentUser, isAuthenticated, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
