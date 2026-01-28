"use client";

import { useRouter } from "next/navigation";

export default function AuthPage() {
  const router = useRouter();

  return (
    <main style={{ maxWidth: 400, margin: "40px auto" }}>
      <h1>Autoryzacja</h1>

      <button onClick={() => router.push("/auth/login")}>Logowanie</button>
      <button onClick={() => router.push("/auth/register")}>Rejestracja</button>
    </main>
  );
}


