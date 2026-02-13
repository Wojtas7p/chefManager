// chat/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ChatBox } from '@/components/chat/ChatBox';
import { ChatInput } from '@/components/chat/ChatInput';
import { ChatUsersList } from '@/components/chat/ChatUsersList';
import { GroupsManager } from '@/components/chat/GroupsManager';
import { getMessages, sendMessage, getUnread, markAsRead } from '@/lib/chatApi';
import { ChatMessage, ChatGroup } from '@/types/chat';

type Drafts = Record<string, string>;

export default function ChatPage() {
  const { user } = useAuth();
  const token = user?.token;

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [unreadUsers, setUnreadUsers] = useState<string[]>([]);
  const [unreadGroups, setUnreadGroups] = useState<string[]>([]);

  // drafty per user/group
  const [drafts, setDrafts] = useState<Drafts>(() => {
    if (typeof window === 'undefined') return {};
    const saved = localStorage.getItem('chat:drafts');
    return saved ? JSON.parse(saved) : {};
  });

  const [receiverId, setReceiverId] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    const saved = localStorage.getItem('chat:selected');
    return saved ? JSON.parse(saved).receiverId : null;
  });

  const [groupId, setGroupId] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    const saved = localStorage.getItem('chat:selected');
    return saved ? JSON.parse(saved).groupId : null;
  });

  // zapisujemy w localStorage
  useEffect(() => {
    localStorage.setItem('chat:selected', JSON.stringify({ receiverId, groupId }));
  }, [receiverId, groupId]);

  useEffect(() => {
    localStorage.setItem('chat:drafts', JSON.stringify(drafts));
  }, [drafts]);

  /* ---------- DATA ---------- */

  async function loadUnread() {
    if (!token) return;
    const d = await getUnread(token);
    setUnreadUsers(d.users);
    setUnreadGroups(d.groups);
  }

  async function loadMessages(rId = receiverId, gId = groupId) {
    if (!token || (!rId && !gId)) {
      setMessages([]);
      return;
    }
    const d = await getMessages(token, rId, gId);
    setMessages(d);
  }

  /* ---------- ACTIONS ---------- */

  async function handleSend(text: string) {
    if (!token) return;
    if (!receiverId && !groupId) return;

    await sendMessage(token, text, receiverId, groupId);

    const key = receiverId ? `user:${receiverId}` : `group:${groupId}`;
    setDrafts(p => ({ ...p, [key]: '' }));

    await markAsRead(token, receiverId, groupId);
    await loadMessages();
    await loadUnread();
  }

  async function selectUser(id: string | null) {
    setReceiverId(id);
    setGroupId(null);

    if (id) {
      await markAsRead(token!, id, null);
      setUnreadUsers(p => p.filter(x => x !== id));
    }

    await loadMessages(id, null);
  }

  async function selectGroup(g: ChatGroup) {
    setGroupId(g._id);
    setReceiverId(null);

    await markAsRead(token!, null, g._id);
    setUnreadGroups(p => p.filter(x => x !== g._id));

    await loadMessages(null, g._id);
  }

  function closeChat() {
    setReceiverId(null);
    setGroupId(null);
    setMessages([]);
  }

  useEffect(() => {
    loadUnread();
  }, [token]);

  useEffect(() => {
    loadMessages();
  }, [receiverId, groupId]);

  const activeKey =
    receiverId ? `user:${receiverId}` : groupId ? `group:${groupId}` : null;

  // czyścimy wszystko przy wylogowaniu
  useEffect(() => {
    if (!user) {
      setReceiverId(null);
      setGroupId(null);
      setMessages([]);
      setUnreadUsers([]);
      setUnreadGroups([]);
      setDrafts({});
      localStorage.removeItem('chat:selected');
      localStorage.removeItem('chat:drafts');
    }
  }, [user]);

  return (
    <div className="space-y-4 pt-14 h-[100vh] overflow-auto ">
      <ChatUsersList
        value={receiverId}
        onChange={selectUser}
        unreadUsers={unreadUsers}
        drafts={drafts}
      />

      <GroupsManager
        onSelectGroup={selectGroup}
        unreadGroups={unreadGroups}
        drafts={drafts}
        activeGroupId={groupId}
      />
   

      {(receiverId || groupId) && (
        <div className="flex flex-col bg-gray-100/95 backdrop-blur-xl shadow-2xl p-4 absolute bottom-0 right-20 w-80">
          <div className="flex justify-between items-center border-b pb-2">
            <span className="font-semibold">
              {receiverId ? 'Czat prywatny' : 'Czat grupowy'}
            </span>

            <button onClick={closeChat} className="text-gray-500 hover:text-[#32A293] font-bold text-2xl">
              ✕
            </button>
          </div>

          {activeKey && (
            <div className="flex flex-col justify-between h-102">
              <ChatBox messages={messages} />
              <ChatInput
                value={drafts[activeKey] || ''}
                onChange={(v: string) =>
                  setDrafts(p => ({ ...p, [activeKey]: v }))
                }
                onSend={handleSend}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

