"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) router.push("/auth/login");
  }, []);

  return (
    <main>
      <h1>Panel użytkownika</h1>
      {/* TU w przyszłości loadUsers, loadSuppliers, loadProducts, chat, grafik */}
    </main>
  );
}
