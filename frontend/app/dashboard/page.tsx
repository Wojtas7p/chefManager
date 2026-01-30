"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUsers } from "@/lib/api";
import { User } from "@/types/user";
import ChatPage from './chat/page';
import { ReactNode } from 'react';
import Link from 'next/link';


export default function DashboardPage({children}:{children: ReactNode}) {
  const router = useRouter();

  
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

   async function loadUsers() {
      const data = await getUsers();
      setUsers(data);
      setLoading(false);
    }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/auth/login");
    loadUsers();
  }, []);


 


  return (
    <main>
      <h1>Panel użytkownika</h1>
      {/* TU w przyszłości loadUsers, loadSuppliers, loadProducts, chat, grafik */}


      <div className="flex h-screen">
      {/* SIDEBAR */}
      <aside className="w-64 border-r p-4 space-y-2">
        <h2 className="font-bold text-lg">Dashboard</h2>

        <nav className="flex flex-col gap-2">
          <Link href="/dashboard">Home</Link>
          <Link href="/dashboard/users">Użytkownicy</Link>
          <Link href="/dashboard/chat">Czat</Link>
          <Link href="/dashboard/suppliers">supplier</Link>
        </nav>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>


<div style={{display:"flex", alignContent:"center", justifyContent:"space-between"}}> 




<div>

       <section>
        <h2>Lista użytkowników</h2>

        {loading && <p>Ładowanie...</p>}

        {!loading && users.length === 0 && <p>Brak użytkowników</p>}

        {users.map(u => (
          <div key={u._id} style={{ borderBottom: "1px solid #ccc", padding: 8 }}>
            <b>{u.name}</b> ({u.login}) 
            <p>{u.role} {u.position} </p>
            <p>{u.birthDate} {u.phone}</p>
            <p>Grafik: {u.permissions.canManageSchedule ? "TAK" : "NIE"}</p>        
          </div>
        ))}
      </section>
      <aside className="border-l pl-4">
        <ChatPage />
      </aside>
</div>
</div>
      
    </main>
  );
}
