"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { token } from "@/lib/token";
import { getUser } from "@/lib/user";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token.get()) {
      return;
    }

    getUser()
      .then((data) => {
        setUser(data);
      })
      .catch(() => token.remove())
      .finally(() => {
        console.log("Hello");
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
