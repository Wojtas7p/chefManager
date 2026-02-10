'use client';

import { useState } from 'react';

interface Props {
  value: string;
  onChange: (value: string) => void;
  onSend: (text: string) => void | Promise<void>;
}

export function ChatInput({ value, onChange, onSend }: Props) {
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;

    setSending(true);
    await onSend(value);
    setSending(false);
  }

  return (

    
    <form onSubmit={handleSubmit} className="flex gap-2 rounde ">
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        className="flex-1 px-2 py-1 rounded-2xl bg-gray-300"
        placeholder="Abc.."
      />

      <button
        type="submit"
        disabled={sending}
        className="px-3 py-1 "
      >
        Wyślij
      </button>
    </form>
  );
}

