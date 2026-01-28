// components/chat/ChatBox.tsx

'use client';

import { ChatMessage } from '@/types/chat';

export function ChatBox({ messages }: { messages: ChatMessage[] }) {
  return (
    <div className="border h-[300px] overflow-y-auto p-2 space-y-1">
      {messages.map((m) => (
        <div key={m._id}
        >
          <strong>{m.sender.name}:</strong> {m.text}
        </div>
      ))}
    </div>
  );
}
