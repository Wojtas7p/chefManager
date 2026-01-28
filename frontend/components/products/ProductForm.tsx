"use client"

import { useState } from "react"
import { apiFetch } from "@/lib/suppliersApi"

export default function ProductForm({ supplierId, onCreated }: any) {
  const [name, setName] = useState("")

  async function handleSubmit() {
    if (!supplierId) return alert("Wybierz dostawcę")

    await apiFetch("/products", {
      method: "POST",
      body: JSON.stringify({ name, supplierId }),
    })

    setName("")
    onCreated()
  }

  return (
    <div className="flex gap-2 mt-4">
      <input
        className="border px-3 py-2 rounded w-full"
        placeholder="Nazwa produktu"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={handleSubmit} className="bg-black text-white px-4 rounded">
        Dodaj
      </button>
    </div>
  )
}
