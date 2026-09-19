"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Student } from "@/data/students";
import { getSession, clearSession } from "@/lib/auth";

interface AuthContextValue {
  student: Student | null;
  isLoading: boolean;
  refresh: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>({
  student: null,
  isLoading: true,
  refresh: () => {},
  logout: () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const refresh = () => {
    setStudent(getSession());
  };

  useEffect(() => {
    refresh();
    setIsLoading(false);
  }, []);

  const logout = () => {
    clearSession();
    setStudent(null);
  };

  return (
    <AuthContext.Provider value={{ student, isLoading, refresh, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
