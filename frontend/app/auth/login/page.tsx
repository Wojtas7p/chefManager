
"use client";

import { useState } from "react";
import { login } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [loginVal, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);


async function handleLogin() {
  setError(null); // reset error
  try {
    const deviceId = localStorage.getItem("deviceId") || crypto.randomUUID();
    localStorage.setItem("deviceId", deviceId);

    const res = await login({ login: loginVal, password, deviceId });

    if (res.requireOtp) {
      sessionStorage.setItem("pendingLogin", loginVal);
      sessionStorage.setItem("devOtp", res.otp || ""); // 🔹to dev
      router.push("/auth/otp");
      return;
    }

    if (res.token) {
      loginUser(res.token);
    }
  }catch {
  setError("Zły login lub hasło");
}
}



  return (
    <main>
      <h1>Logowanie</h1>
      <input
  placeholder="Login"
  value={loginVal}
  onChange={e => setLogin(e.target.value)}
/>
<input
  type="password"
  placeholder="Hasło"
  value={password}
  onChange={e => setPassword(e.target.value)}
/>
{error && <p style={{ color: "red" }}>{error}</p>} 
<button onClick={handleLogin}>Zaloguj</button>

    </main>
  );
}

