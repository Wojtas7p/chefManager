"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/api";

export default function RegisterPage() {
  const [loginVal, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const router = useRouter();

  async function handleRegister() {
    try {
      await register({ login: loginVal, password, name });
      router.push("/auth/login");
    } catch {
      alert("Błąd rejestracji");
    }
  }

  return (
    <main>
      <h1>Rejestracja</h1>
      <input placeholder="Nazwa" onChange={e => setName(e.target.value)} />
      <input placeholder="Login" onChange={e => setLogin(e.target.value)} />
      <input type="password" placeholder="Hasło" onChange={e => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Zarejestruj</button>
    </main>
  );
}
