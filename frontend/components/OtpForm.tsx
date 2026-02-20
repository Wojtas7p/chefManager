// "use client";

// import { useState, useEffect, useRef } from "react";
// import { verifyOtp } from "@/lib/api";
// import { useAuth } from "@/context/AuthContext";
// import Image from "next/image"
// import {useRouter}from "next/navigation";

// export default function OtpForm({
//   login,
//   otpDev,
// }: {
//   login: string;
//   otpDev?: string; 
// }) {
//   const [otp, setOtp] = useState("");
//   const [trust, setTrust] = useState(false);
//   const { loginUser } = useAuth();
//   const printed = useRef(false);
//   const [error, setError] = useState<string | null>(null);
//   const router = useRouter();

//   // righting OTP in consol dev 
//   useEffect(() => {
//     if (otpDev && !printed.current) {
//       console.log(`🔹 DEV OTP dla ${login}: ${otpDev}`);
//       printed.current = true;
//     }
//   }, [otpDev, login]);

//  async function submit() {
//   setError(null); // reset error
//   const deviceId = localStorage.getItem("deviceId") || crypto.randomUUID();
//   localStorage.setItem("deviceId", deviceId);

//   try {
//     const data = await verifyOtp({
//       login,
//       otp,
//       trustDevice: trust,
//       deviceId,
//     });

//     loginUser(data.token);
//   } catch (err: any) {
//     setError(err.message); 
//   }
// }

//   return (
//     <main className=" main flex ">

// <Image
//          src="/bgEntriCode.png"
//          alt="Tło logowania"
//         fill
//         priority
//         className="object-cover"
//       />  
                      
//        <div className="absolute z-10 inset-0 bg-white/40 " />


//       <button onClick={() => router.back()}>
//         <Image
//             src="/arrow-back-up.svg" alt="Logo" width={60} height={50} 
//             className="object-contain mb-6 fixed z-30 top-2 left-3
//             transition-transform duration-200 hover:scale-110
//             " unoptimized priority
//           /> 
//       </button>


//   <div className="flex flex-col item-center justify-center m-auto rounded-lg p-8 m-4 
//       relative z-20 flex flex-col bg-gray-100/10 backdrop-blur-sm w-80 shadow-lg max-[400px]:min-w-70">
//  <h2 className="font-medium text-xl text-center text-gray-900">Kod weryfikacyjny</h2>
//  <div className="relative ">
// <input
//   value={otp}
//   onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
//   placeholder="Wpisz kod"
//   inputMode="numeric"
//   pattern="[0-9]*"
//   className="mb-5 mt-2 px-4 py-2 input-form text-xl"
// />
// {error && <p className="err-form ">{error}</p>} 
// </div>
// <label className="flex gap-3 mb-3">
//   <input
//     type="checkbox"
//     checked={trust}
//     onChange={(e) => setTrust(e.target.checked)}
//     className="accent-[#2E8A80]"
//   />
//   Zaufaj temu urządzeniu
// </label>

// <button onClick={submit} className="button-form  hover:bg-[#32A293]">Zatwierdź</button>

//       </div>
//     </main>
//   );
// }


"use client";

import { useState, useEffect, useRef } from "react";
import { verifyOtp } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

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
  const router = useRouter();

  useEffect(() => {
    if (otpDev && !printed.current) {
      console.log(`🔹 DEV OTP dla ${login}: ${otpDev}`);
      printed.current = true;
    }
  }, [otpDev, login]);

  async function submit() {
    setError(null);
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
    <main className="main flex">
      <Image
        src="/bgEntriCode.png"
        alt="Tło logowania"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute z-10 inset-0 bg-white/40" />

      <button onClick={() => router.back()}>
        <Image
          src="/arrow-back-up.svg"
          alt="Logo"
          width={60}
          height={50}
          className="object-contain mb-6 fixed z-30 top-2 left-3 transition-transform duration-200 hover:scale-110"
          unoptimized
          priority
        />
      </button>

      <div className="flex flex-col item-center justify-center m-auto rounded-lg p-8 m-4 relative z-20 flex flex-col bg-gray-100/10 backdrop-blur-sm w-80 shadow-lg max-[400px]:min-w-70">
        <h2 className="font-medium text-xl text-center text-gray-900">Kod weryfikacyjny</h2>
        <div className="relative">
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
            placeholder="Wpisz kod"
            inputMode="numeric"
            pattern="[0-9]*"
            className="mb-5 mt-2 px-4 py-2 input-form text-xl"
          />
          {error && <p className="err-form">{error}</p>}

          {!otpDev && (
            <p className="text-sm text-gray-700 mt-2">
              Sprawdź swój email, aby uzyskać kod OTP.
            </p>
          )}
        </div>

        <label className="flex gap-3 mb-3">
          <input
            type="checkbox"
            checked={trust}
            onChange={(e) => setTrust(e.target.checked)}
            className="accent-[#2E8A80]"
          />
          Zaufaj temu urządzeniu
        </label>

       


       <button
  type="button"
  onClick={async () => {
    try {
      const res = await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login })
      });
      if (!res.ok) throw new Error("Nie udało się wysłać OTP");
      alert("Kod został wysłany ponownie!");
    } catch (e: any) {
      alert(e.message);
    }
  }}
  className="mt-3 text-sm text-blue-600 hover:underline"
>
  Wyślij ponownie kod
</button>




        <button onClick={submit} className="button-form hover:bg-[#32A293]">
          Zatwierdź
        </button>
      </div>
    </main>
  );
}
