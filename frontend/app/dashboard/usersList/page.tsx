"use client";

import { getUsers } from "@/lib/api";
import { useEffect, useState } from "react";
import { User } from "@/types/user";


export default function UsersList () {


    
     const [users, setUsers] = useState<User[]>([]);
      const [loading, setLoading] = useState(true);


   async function loadUsers() {
      const data = await getUsers();
      setUsers(data);
      setLoading(false);
    }

     useEffect(() => {   
        loadUsers();
      }, []);

    return(
<>


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
</>

    );

}

