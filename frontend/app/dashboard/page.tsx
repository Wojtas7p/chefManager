"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ChatPage from './chat/page';
import { ReactNode } from 'react';
import Link from 'next/link';



export default function DashboardPage({children}:{children: ReactNode}) {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/auth/login");

  }, []);


  return (
    
    <main >
      <h1 className="w-max mb-10 mt-10 m-auto text-[40px] font-extrabold border-b">Panel użytkownika</h1>


      <div className="flex h-screen justify-between ">
  
        <aside className="w-64 border-r space-y-2">
    
           <nav className="flex flex-col [&>a]:block [&>a]:w-35 [&>a]:text-center [&>a]:bg-gray-500 [&>a]:text-white 
                [&>a]:rounded-[50px] [&>a]:p-4 [&>a]:mr-4 [&>a]:mt-4
                [&>a]:transition [&>a]:transform [&>a]:hover:bg-gray-400 [&>a]:hover:scale-110
                gap-2">
             <Link href="/dashboard/users">Użytkownicy</Link>
             <Link href="/dashboard/chat">Czat</Link>
             <Link href="/dashboard/suppliers">Supplier</Link>
             <Link href="/dashboard/usersList">UsersList</Link>
              <Link href="/dashboard/shedule">Grafik</Link>
           </nav>

        </aside>
      
        <div className="flex-1 p-6 ">
          {children}  
          <h1>środek Srtony</h1>
        </div>
  
        <aside className="border-l pl-4">
           <ChatPage />
        </aside>
      </div>
      
    </main>
  );
}
