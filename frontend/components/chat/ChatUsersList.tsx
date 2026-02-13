// components/chat/ChatUsersList.tsx.tsx

'use client';


import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { getChatUsers } from '@/lib/chatApi';
import { User } from '@/types/user';

interface Props {
  value: string | null;
  onChange: (id: string | null) => void;
  unreadUsers: string[];
  drafts: Record<string, string>;
}

export function ChatUsersList({ value, onChange, unreadUsers , drafts }: Props) {
  const { user } = useAuth();
  const token = user?.token;
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (!token) return;
    getChatUsers(token).then(setUsers);
  }, [token]);


  return (

 <ul>
  
      {users.map(u => {

        const hasUnread = unreadUsers.includes(u._id);
const hasDraft = Boolean(drafts[`user:${u._id}`]?.trim());
const isActive = value === u._id;


        return (
          
          <li key={u._id} className="relative  px-4 py-2 cursor-pointer flex gap-3
          duration-150 rounded hover:bg-[#d0f6f0] transition-colors"> 
              <div className="bg-gray-400  rounded-3xl w-10 h-10"/>
          
<button
  onClick={() => onChange(u._id)}
    className={` text-left w-42 overflow-hidden
      ${value === u._id ? 'font-semibold' : ''}
      ${hasUnread ? 'bg-blue-100' : ''}
     
  `}
>
  {u.name}
</button>
            {hasDraft && !isActive && (
  <span className="absolute right-2 top-3 h-2 w-2 bg-red-500 rounded-full" />
)}

          </li>
        );
      })}
    </ul>

  );
}
