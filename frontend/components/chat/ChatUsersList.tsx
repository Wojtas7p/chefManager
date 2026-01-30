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
          
          <li key={u._id} className="relative">
<button
  onClick={() => onChange(u._id)}
  className={`w-full text-left px-3 py-2
    ${value === u._id ? 'bg-gray-200 font-semibold' : ''}
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
