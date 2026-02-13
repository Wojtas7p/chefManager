"use client"

import { useState } from "react"
import SupplierList from "@/components/suppliers/SupplierList"
import SupplierForm from "@/components/suppliers/SupplierForm"
import ProductForm from "@/components/products/ProductForm"
import ProductList from "@/components/products/ProductList"

export default function SuppliersPage() {
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null)
  const [refresh, setRefresh] = useState(0)

  return (
    <div className="grid grid-cols-2 gap-6 p-6">
      
      <div>
        <h2 className="text-xl font-semibold mb-3">Dostawcy</h2>
        <SupplierForm onCreated={() => setRefresh((x) => x + 1)} />
        <SupplierList onSelect={setSelectedSupplier} key={refresh} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-3">Produkty</h2>
        <ProductForm supplierId={selectedSupplier} onCreated={() => setRefresh((x) => x + 1)} />
        <ProductList supplierId={selectedSupplier} />
      </div>

    </div>
  )
}
