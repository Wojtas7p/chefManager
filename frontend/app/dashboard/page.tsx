"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ChatPage from './chat/page';
import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';



export default function DashboardPage({children}:{children: ReactNode}) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/");

  }, []);


  return (
    
    <main className="main flex">

      <Image
        src="/bgUserHome.png"
        alt="Tło logowania"
        fill
        priority
        className="object-cover"
      />         
      <div className="absolute z-10 inset-0 bg-white/10 " />


<div className="flex relative z-20 w-full">
  

     <aside className="space-y-2 px-4 py-6 bg-gray-100/10 backdrop-blur-sm shadow-lg ">
           
          <Image
            src="/logoFlowGastro.png" alt="Logo" width={150} height={50}
            className="object-contain mb-7 max-[800px]:w-50" unoptimized priority
          /> 
    
           <nav className="flex flex-col [&>a]:block [&>a]:text-gray-700 [&>a]:py-1 [&>a]:p-3 [&>a]:transition 
            [&>a]:transform [&>a]:hover:bg-[#d0f6f0] gap-2">

             <Link href="/dashboard/users">Użytkownicy</Link>
             <Link href="/dashboard/chat">Własne</Link>
             <Link href="/dashboard/suppliers">Zamówienia</Link>
             <Link href="/dashboard/usersList">Zarządzanie</Link>
             <Link href="/dashboard/shedule">Grafik</Link>
             <Link href="/dashboard/chatBox">Profil</Link>
          
           </nav>

        </aside>

  <div className="flex w-full">
       
        <aside className="flex-1 p-14 bg-gray-200/10  ">
          {children}  
          <h1>środek Srtony</h1>
        </aside>
  
        <aside className="bg-gray-100/10 backdrop-blur-lg shadow-lg ">
           <ChatPage />
        </aside>
  </div>

</div>  
    </main>
  );
}
