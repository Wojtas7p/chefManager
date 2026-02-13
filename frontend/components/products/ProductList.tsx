// components/products/ProductsList.tsx

"use client"

import { useEffect, useState } from "react"
import { apiFetch } from "@/lib/suppliersApi"
import { Product } from "@/types/product"

export default function ProductList({ supplierId }: { supplierId: string | null }) {
  const [products, setProducts] = useState<Product[]>([])

  async function load() {
    if (!supplierId) return
    const data = await apiFetch(`/products/${supplierId}`)
    setProducts(data)
  }

  useEffect(() => {
    load()
  }, [supplierId])

  return (
    <ul className="mt-4 space-y-2">
      {products.map((p) => (
        <li key={p._id} className="border p-2 rounded">
          {p.name}
        </li>
      ))}
    </ul>
  )
}
