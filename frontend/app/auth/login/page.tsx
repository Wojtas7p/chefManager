"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/lib/api";

export default function LoginPage() {
  const [loginVal, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function handleLogin() {
    try {
      const data = await login({ login: loginVal, password });
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch {
      alert("Błąd logowania");
    }
  }

  return (
    <main>
      <h1>Logowanie</h1>
      <input placeholder="Login" onChange={e => setLogin(e.target.value)} />
      <input type="password" placeholder="Hasło" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Zaloguj</button>
    </main>
  );
}

