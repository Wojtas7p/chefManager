// components/chat/ChatBox.tsx

'use client';

import { ChatMessage } from '@/types/chat';

export function ChatBox({ messages }: { messages: ChatMessage[] }) {
  return (
    <div className="overflow-auto p-2 space-y-1 
    
    flex flex-col border-t border-gray-300 gap-2 p-3 overflow-auto
    ">
      {messages.map((m) => (
        <div key={m._id} className="max-w-[250px] break-words"
        >
          <strong>{m.sender.name}:</strong> {m.text}
        </div>
      ))}
    </div>
  );
}
