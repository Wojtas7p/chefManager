// lib/chatApi.ts

import { ChatMessage, ChatGroup } from '@/types/chat';

const API = "http://localhost:3000/api";

export async function getChatUsers(token: string) {
  const res = await fetch(`${API}/users`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store'
  });
  if (!res.ok) throw new Error('Get chat users error');
  return res.json();
}

export async function getMessages(
  token: string,
  receiverId?: string | null,
  groupId?: string | null
): Promise<ChatMessage[]> {
  const params = new URLSearchParams();
  if (receiverId) params.append('receiverId', receiverId);
  if (groupId) params.append('groupId', groupId);

  const res = await fetch(`${API}/chat?${params.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store'
  });

  if (!res.ok) throw new Error('Get messages error');
  return res.json();
}

export async function sendMessage(
  token: string,
  text: string,
  receiverId?: string | null,
  groupId?: string | null
) {
  const res = await fetch(`${API}/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ text, receiverId, groupId })
  });

  if (!res.ok) throw new Error('Send message error');
}

export async function getGroups(token: string): Promise<ChatGroup[]> {
  const res = await fetch(`${API}/chat-groups`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store'
  });
  if (!res.ok) throw new Error('Get groups error');
  return res.json();
}

export async function createGroup(token: string, name: string, members: string[]): Promise<ChatGroup> {
  const res = await fetch(`${API}/chat-groups`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ name, members })
  });
  if (!res.ok) throw new Error('Create group error');
  return res.json();
}

export async function leaveGroup(token: string, groupId: string) {
  const res = await fetch(`${API}/chat-groups/${groupId}/leave`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });
  if (!res.ok) throw new Error('Leave group error');
}

export async function getUnread(token: string) {
  const res = await fetch(`${API}/chat/unread`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store'
  });
  if (!res.ok) throw new Error('Get unread error');
  return res.json();
}

export async function markAsRead(
  token: string,
  receiverId?: string | null,
  groupId?: string | null
) {
  await fetch(`${API}/chat/read`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ receiverId, groupId })
  });
}
