"use client"

import { useEffect, useState } from "react"
import { Supplier } from "@/types/supplier"
import { apiFetch } from "@/lib/suppliersApi"

export default function SupplierList({ onSelect }: { onSelect: (id: string) => void }) {
  const [suppliers, setSuppliers] = useState<Supplier[]>([])

  async function load() {
    const res = await apiFetch("/suppliers")
    const data = await res.json()
    setSuppliers(data)
  }

  useEffect(() => {
    load()
  }, [])

  return (
    <ul className="space-y-2">
      {suppliers.map((s) => (
        <li
          key={s._id}
          onClick={() => onSelect(s._id)}
          className="cursor-pointer p-2 border rounded hover:bg-gray-100"
        >
          {s.name}
        </li>
      ))}
    </ul>
  )
}
