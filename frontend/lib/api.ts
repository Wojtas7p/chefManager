
// lib/api.ts
const API = "http://localhost:5000/api";
import type { RegisterDTO, CreateUserDTO } from "@/types/dto";


async function parseError(res: Response): Promise<{ message: string; code: string | null }> {
  try {
    const data = await res.json();
    // zakładamy, że backend może mieć { error: "...", code: "LOGIN_EXISTS" } lub tylko string w data.error
    return {
      message: typeof data.error === "string" ? data.error : "Błąd serwera",
      code: data.code || null
    };
  } catch {
    return { message: "Błąd serwera", code: null };
  }
}



// -------------------- LOGIN --------------------
export async function login(data: { login: string; password: string; deviceId: string }) {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

    if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "OTP verification error");
  }

  return res.json();
}


// -------------------- OTP VERIFY --------------------
export async function verifyOtp(data: { login: string; otp: string; trustDevice?: boolean; deviceId?: string }) {
  const res = await fetch(`${API}/auth/verify-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const { message } = await parseError(res); // <- tylko message, nie code
    throw new Error(message);
  }

  return res.json(); // { token }
}


// -------------------- REGISTER --------------------


export async function register(data: RegisterDTO) {
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const { message, code } = await parseError(res);
    const error: any = new Error(message);
    error.code = code; // <- teraz można sprawdzać w handleRegister
    throw error;
  }

  return res.json();
}



// -------------------- CREATE USER --------------------
export async function createUser(data: CreateUserDTO) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
  let message = "Błąd tworzenia użytkownika";

  try {
    const data = await res.json();
    message = data.error || message;
  } catch {
    // fallback
  }

  throw new Error(message);
}


  return res.json();
}

// -------------------- GET USERS --------------------
export async function getUsers() {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || "Get users error");
  }

  return res.json();
}




