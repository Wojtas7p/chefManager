
"use client";

import { useState } from "react";
import { login } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
    <main style={{position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden"}}>


  <Image
         src="/bgLineB.svg"
         alt="Tło logowania"
        fill
        priority
        className="object-cover"
      />  
                      
       <div className="absolute z-10 inset-0 bg-white/60 " />
      


<div className=" flex flex-col pt-32 relative z-20 gap-10 items-center">
  
     
     <div className="flex flex-col items-center">
  <Image
            src="/logoFlowGastro.png" alt="Logo" width={250} height={50}
            className="object-contain mb-7 max-[800px]:w-50" unoptimized priority
          /> 
    <h1 className="text-xl font-semibold">Zaloguj się do FlowGastro</h1>

   </div>


    
        
         <div className="rounded-xl p-8 m-4 relative z-20 flex flex-col bg-gray-100/10 backdrop-blur-sm 
         w-140 ounded-lg shadow-lg" >

          {/* <div className="bg-[#3BAFA4] w-50 h-50"></div>  */}

      
      
          <input
            className="input-form"
            placeholder="Adres e-mail"
            value={loginVal}
            onChange={e => setLogin(e.target.value)}
            />
            <input
            className="input-form"
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={e => setPassword(e.target.value)}
            />
            {error && <p style={{ color: "red" }}>{error}</p>} 
            <button onClick={handleLogin} className="button-form">Zaloguj</button>
        </div>
  </div>

    </main>
  );
}

