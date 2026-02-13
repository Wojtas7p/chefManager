
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { AuthContextType, AuthUser} from "@/types/auth";
import { useRouter } from "next/navigation";

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isReady, setIsReady] = useState(false); // key
  const router = useRouter();
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ token });
    }
    setIsReady(true); 
  }, []);




  function loginUser(token: string) {
    localStorage.setItem("token", token);
    setUser({ token });
    router.push("/dashboard");
  }

  function logout() {
    localStorage.removeItem("token");
    
    setUser(null);
    router.push("/");
  }




  if (!isReady) return null; 

  return (
    <AuthContext.Provider value={{ user, loginUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth outside provider");
  return ctx;
}
