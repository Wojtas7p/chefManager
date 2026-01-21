// lib/api.ts
const API = "http://localhost:3000/api";

export async function login(data: { login: string; password: string }) {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Login error");
  return res.json();
}

export async function register(data: { login: string; password: string; name: string }) {
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Register error");
  return res.json();
}


