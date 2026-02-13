
"use client";

import { useState } from "react";
import { login } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from"next/link";


export default function LoginPage() {
  const [loginVal, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useAuth();
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [rememberMe, setRememberMe] = useState(false);


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
    <main className="main">


  <Image
         src="/bgLineB.svg"
         alt="Tło logowania"
        fill
        priority
        className="object-cover"
      />  
                      
       <div className="absolute z-10 inset-0 bg-white/60 " />
      

      <Link href="/auth">
        <Image
            src="/arrow-back-up.svg" alt="Logo" width={60} height={50} 
            className="object-contain mb-6 fixed z-30 top-2 left-3
            transition-transform duration-200 hover:scale-110
            " unoptimized priority
          /> 
      </Link>


<div className=" flex flex-col pt-24 relative z-20 gap-10 items-center 
max-[400px]:min-w-[300px] max-[400px]:pt-24 max-[400px]:gap-2">
  
     
     <div className="flex flex-col items-center">

      <Link href="/">
       <Image
            src="/logoFlowGastro.png" alt="Logo" width={250} height={50}
            className="object-contain mb-7 max-[800px]:w-50" unoptimized priority
          /> 
        </Link>
    <h1 className="text-xl font-semibold max-[400px]:text-lg">Zaloguj się do FlowGastro</h1>

   </div>


    
        
         <div className="rounded-lg p-8 m-4 relative z-20 flex flex-col bg-gray-100/10 backdrop-blur-sm 
         w-140 shadow-lg max-[800px]:w-100 max-[400px]:w-80" >
     
      <div className="relative">
          <input
            className="input-form"
            placeholder="Adres e-mail"
            value={loginVal}
            onChange={e => setLogin(e.target.value)}
            />
              
          {error && <p className="err-form">{error}</p>} 
        </div>

          <div className="relative">
            <input
            className="input-form"
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={e => setPassword(e.target.value)}
            />
            
            {error && <p className="err-form">{error}</p>} 
          </div>
            <div>
              
              <label className="flex items-center gap-2 mb-6 text-gray-900">
              <input 
                type="checkbox" 
                 checked={rememberMe} 
                 onChange={e => setRememberMe(e.target.checked)} 
                 className="accent-[#2E8A80]"
               />
                Zapamiętaj mnie
                </label>
            </div>


            <button onClick={handleLogin} className="button-form cursor-pointer opacity-100 hover:bg-[#32A293]">Zaloguj</button>

    
            
            
        </div>
  </div>

    </main>
  );
}

