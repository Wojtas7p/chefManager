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

interface Props {
  onSelectGroup: (group: ChatGroup) => void;
  unreadGroups: string[];
  drafts: Record<string, string>;
}

export function GroupsManager({ onSelectGroup, unreadGroups, drafts }: Props) {
  const { user } = useAuth();
  const token = user?.token;

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
  }

  async function handleLeaveGroup(id: string) {
    await leaveGroup(token!, id);
    setGroups(prev => prev.filter(g => g._id !== id));
  }

  return (
    <div className="space-y-3">
      {groups.map(g => {
        const hasUnread = unreadGroups.includes(g._id);
        const hasDraft = drafts[`group:${g._id}`]?.trim();

        return (
          <div
            key={g._id}
            className={`relative border p-2 rounded cursor-pointer
              ${hasUnread ? 'bg-blue-100 font-bold' : ''}
            `}
            onClick={() => onSelectGroup(g)}
          >
            <span>{g.name}</span>

            {(hasUnread || hasDraft) && (
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
            )}

            <button
              onClick={e => {
                e.stopPropagation();
                handleLeaveGroup(g._id);
              }}
              className="ml-2 text-red-500 text-sm"
            >
              Opuść
            </button>
          </div>
        );
      })}

      <input
        value={groupName}
        onChange={e => setGroupName(e.target.value)}
        placeholder="Nazwa grupy"
        className="border px-2 py-1 w-full"
      />

      <div className="flex flex-wrap gap-2">
        {users.map(u => (
          <label key={u._id} className="flex items-center gap-1">
            <input
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

      <button
        onClick={handleCreateGroup}
        className="px-3 py-1 bg-black text-white"
      >
        Utwórz grupę
      </button>
    </div>
  );
}
