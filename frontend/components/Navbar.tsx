"use client";

import Link from "next/link";
import Image from "next/image"
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const isHome = pathname === "/";

  return (


    <nav 
    className="flex p-3 w-full items-center justify-between text-black"
    style={{
        background:isHome ? "white":"transparent", 
        boxShadow: isHome
          ? "0px 2px 4px 2px lightgrey"
          : "none",
        }}
    >
      <Link href="/">
      </Link>
     {!user && (
  <>
    {isHome ? (
      <Link href="/">
        <Image
          src="/logoFlowGastro.png"
          alt="Logo"
          width={190}
          height={20}
          style={{ objectFit: "contain" }}
          unoptimized
          priority
        />
      </Link>
    ) : null}
    {isHome && <Link href="/auth">Konto</Link>}
  </>
)}

      {user && (
        <div>
          <Link href="/dashboard">Panel</Link>
          <Link href="/dashboard/users">Użytkownicy</Link>
          <button onClick={logout}>Wyloguj</button>
        </div>
      )}
    </nav>
  );
}
