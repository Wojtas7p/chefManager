"use client";

import Link from "next/link";
import Image from "next/image"
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import "../app/globals.css";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const isHome = pathname === "/";

  return (


    <nav 
    className="flex py-3 px-5 w-full items-center justify-between text-black"
    style={{
        background:isHome ? "white":"transparent", 
        boxShadow: isHome
          ? "0px 2px 4px 2px lightgrey"
          : "none",
        }}
    >
     {!user && (
  <>
   <div>
    {isHome ? (
      <Link href="#headerSection">
        <Image
          src="/logoFlowGastro.png"
          alt="Logo"
          width={130}
          height={20}
          style={{ objectFit: "contain" }}
          unoptimized
          priority
        />
      </Link>
    ) : null}
    </div>
    <div className="flex gap-10 font-semibold grupe text-gray-700">
      {isHome && (
        <>
          <Link className="nav-el" href="#headerSection">Start</Link>
          <Link className="nav-el" href="#mainSection">Zarządzanie</Link>
          <Link className="nav-el" href="#contentSection">Korzyści</Link>
          <Link className="nav-el" href="#footerSection">Wsparcie</Link>
        </>
        
      )}
    {isHome && <Link href="/auth" className="px-8 py-2 rounded-sm 
           focus:outline-none focus:ring-2 focus:ring-blue-500 
          text-white font-semibold placeholder-gray-900
           bg-[#2E8A80] transition-colors duration-200 hover:opacity-90 transition-all shadow-lg ">Konto</Link>}
    </div>
   
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
