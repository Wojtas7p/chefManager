"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (


    <nav style={{ display: "flex", gap: 16, padding: 12 }}>
      {!user && (
        <>
          <Link href="/">Home</Link>
          {!pathname.includes("/login") && !pathname.includes("/register") && (
            <Link href="/auth">Konto</Link>
          )}
        </>
      )}
      {user && (
        <>
          <Link href="/dashboard">Panel</Link>
          <Link href="/dashboard/users">Użytkownicy</Link>
          <button onClick={logout}>Wyloguj</button>
        </>
      )}
    </nav>
  );
}
