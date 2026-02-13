"use client"

import { useState } from "react"
import { apiFetch } from "@/lib/suppliersApi"

export default function SupplierForm({ onCreated }: { onCreated: () => void }) {
  const [name, setName] = useState("")

  async function handleSubmit() {
    await apiFetch("/suppliers", {
      method: "POST",
      body: JSON.stringify({ name }),
    })

    setName("")
    onCreated()
  }

  return (
    <div className="flex gap-2">
      <input
        className="border px-3 py-2 rounded w-full"
        placeholder="Nazwa dostawcy"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        className="bg-black text-white px-4 rounded"
      >
        Dodaj
      </button>
    </div>
  )
}
