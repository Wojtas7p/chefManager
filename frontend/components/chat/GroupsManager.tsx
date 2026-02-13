// components/chat/GroupsManager.tsx

'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import {
  getChatUsers,
  getGroups,
  createGroup,
  leaveGroup
} from '@/lib/chatApi';
import { User } from '@/types/user';
import { ChatGroup } from '@/types/chat';
import Image from 'next/image';

interface Props {
  onSelectGroup: (group: ChatGroup) => void;
  unreadGroups: string[];
  drafts: Record<string, string>;
  activeGroupId: string | null;
}


export function GroupsManager({  activeGroupId, onSelectGroup, unreadGroups, drafts }: Props) {
  const { user } = useAuth();
  const token = user?.token;
 const [isCreatingGroup, setIsCreatingGroup] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [groups, setGroups] = useState<ChatGroup[]>([]);
  const [groupName, setGroupName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  useEffect(() => {
    if (!token) return;
    Promise.all([getChatUsers(token), getGroups(token)]).then(
      ([u, g]) => {
        setUsers(u);
        setGroups(g);
      }
    );
  }, [token]);

  async function handleCreateGroup() {
    if (!groupName.trim()) return;
    const g = await createGroup(token!, groupName, selectedMembers);
    setGroups(prev => [...prev, g]);
    setGroupName('');
    setSelectedMembers([]);
    setIsCreatingGroup(false);
  }

  async function handleLeaveGroup(id: string) {
    await leaveGroup(token!, id);
    setGroups(prev => prev.filter(g => g._id !== id));
  }

  return (
    <div className="border-t border-gray-300">

      <h2 className="pl-4 py-2 font-bold text-gray-500 text-lg" >Grupy</h2>
      
     {groups.map(g => {
  const hasUnread = unreadGroups.includes(g._id);
  const hasDraft = Boolean(drafts[`group:${g._id}`]?.trim());
  const isActive = activeGroupId === g._id;

  return (
    <div
      key={g._id}
      className={`relative px-4 py-2 rounded cursor-pointer hover:bg-[#d0f6f0] 
        flex gap-3 items-center  
        ${hasUnread ? 'bg-blue-100 font-semibold ' : ''}
      `}
      onClick={() => onSelectGroup(g)}
      
    >

      <div className="bg-gray-400  rounded-3xl w-10 h-10"/>

      <div className='font-semibold text-gray-800 overflow-hidden w-42'>{g.name}</div>

   
      {hasDraft && !isActive && (
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
      )}

      <button
        onClick={e => {
          e.stopPropagation();
          handleLeaveGroup(g._id);
        }}
        className="ml-2 text-red-500 text-sm "
      >
        Opuść
      </button>
    </div>
  );
})}


<div
  className='flex gap-2 items-center cursor-pointer hover:bg-[#d0f6f0] p-4 rounded-lg group'
  onClick={() => setIsCreatingGroup(true)}
>
  <Image
    src="/plus.svg"
    alt='add'
    width={40}
    height={20}
    priority
    className="bg-[#2E8A80] text-blue-300 rounded-3xl p-1 cursor-pointer group-hover:bg-[#32A293]"
  />
  <p className="font-semibold text-gray-800">Utwórz nową grupę</p>
</div>



 {isCreatingGroup && (
  <div className="flex flex-col bg-gray-100/95 backdrop-blur-xl shadow-2xl p-4 absolute bottom-0 right-20 w-80">
    
    <div className="flex justify-end">
      <button
        onClick={() => setIsCreatingGroup(false)}
        className="text-gray-500 hover:text-[#32A293] font-bold text-2xl"
      >
        ✕
      </button>
    </div>

    <input
      value={groupName}
      onChange={e => setGroupName(e.target.value)}
      placeholder="Nazwa grupy"
      className="input-form mb-4"
    />

    <div className='flex justify-center pb-4'>
      <button
        onClick={handleCreateGroup}
        className="text-lg text-gray-700 flex gap-3 font-semibold hover:text-gray-800 hover:font-bold"
      >
        Utwórz grupę
      </button>
    </div>

    <div className="flex flex-col border-t border-gray-300 gap-2 p-3 h-80">
      {users.map(u => (
        <label
          key={u._id}
          className="flex items-center gap-1 cursor-pointer hover:bg-[#d0f6f0] overflow-hidden"
        >
          <input
            className="accent-[#2E8A80] cursor-pointer "
            type="checkbox"
            checked={selectedMembers.includes(u._id)}
            onChange={() =>
              setSelectedMembers(p =>
                p.includes(u._id)
                  ? p.filter(x => x !== u._id)
                  : [...p, u._id]
              )
            }
          />
          {u.name}
        </label>
      ))}
    </div>
  </div>
)}


   
    </div>
  );
}
