"use client";

import OtpForm from "@/components/OtpForm";

export default function OtpPage() {
  const login =
    typeof window !== "undefined"
      ? sessionStorage.getItem("pendingLogin")
      : null;
  const otpDev =
    typeof window !== "undefined"
      ? sessionStorage.getItem("devOtp") || undefined
      : undefined;

  if (!login) return <p>Brak aktywnej sesji OTP</p>;

  return <OtpForm login={login} otpDev={otpDev} />;
}

