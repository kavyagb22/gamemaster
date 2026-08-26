/** @format */
"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { apiGet } from "@/helpers/api";
import { User } from "@/models/user";

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function checkAuthOnBoot() {
      if (typeof window === "undefined") return;

      const token = localStorage.getItem("token");

      if (!token || token === "undefined") {
        setLoading(false);
        return;
      }
      try {
        const response = await apiGet<{ status: number; data: User }>(
          "/auth/user"
        );
        console.log("/auth/user: ", response);
        setUser(response.data);
      } catch (err) {
        console.error("Boot auth validation failed:", err);
        localStorage.removeItem("token");
        router.push("/signin");
      } finally {
        setLoading(false);
      }
    }

    checkAuthOnBoot();
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    router.push("/signin");
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
