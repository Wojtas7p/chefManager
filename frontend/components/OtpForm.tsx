"use client";

import { useState, useEffect, useRef } from "react";
import { verifyOtp } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

export default function OtpForm({
  login,
  otpDev,
}: {
  login: string;
  otpDev?: string; 
}) {
  const [otp, setOtp] = useState("");
  const [trust, setTrust] = useState(false);
  const { loginUser } = useAuth();
  const printed = useRef(false);
  const [error, setError] = useState<string | null>(null);


  // righting OTP in consol dev 
  useEffect(() => {
    if (otpDev && !printed.current) {
      console.log(`🔹 DEV OTP dla ${login}: ${otpDev}`);
      printed.current = true;
    }
  }, [otpDev, login]);

 async function submit() {
  setError(null); // reset error
  const deviceId = localStorage.getItem("deviceId") || crypto.randomUUID();
  localStorage.setItem("deviceId", deviceId);

  try {
    const data = await verifyOtp({
      login,
      otp,
      trustDevice: trust,
      deviceId,
    });

    loginUser(data.token);
  } catch (err: any) {
    setError(err.message); 
  }
}

  return (
    <div>
      <h2>Kod weryfikacyjny</h2>
<input
  value={otp}
  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
  placeholder="123456"
  inputMode="numeric"
  pattern="[0-9]*"
/>
{error && <p style={{ color: "red" }}>{error}</p>} 
<label>
  <input
    type="checkbox"
    checked={trust}
    onChange={(e) => setTrust(e.target.checked)}
  />
  Zaufaj temu urządzeniu
</label>

<button onClick={submit}>Potwierdź</button>

    </div>
  );
}
