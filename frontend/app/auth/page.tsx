"use client";

import { useRouter } from "next/navigation";
import Image from "next/image"
import Link from "next/link";


export default function AuthPage() {
  const router = useRouter();

  return (
    <main className="main flex justify-center" >


           <Image
                    src="/bgLine.svg"
                    alt="Tło logowania"
                    fill
                    priority
                     className="object-cover"
                  />
 <div
           
              className="absolute z-10 inset-0 bg-white/60 "
            />

      
      <div className="flex flex-col gap-5 pt-30 max-[400px]:pt-15 z-20"> 
        
      <div className="text-center">

         <Link href="/">
        <Image
          src="/logoFlowGastro.png" alt="Logo" width={250} height={50}
          className="object-contain m-auto mb-7 max-[800px]:w-50" unoptimized priority
        /> 
        </Link>
        <h1 className="text-center text-3xl font-semibold mb-4 max-[800px]:text-2xl">Witamy w flowGastro! </h1>
        <p className="text-xl max-[800px]:text-lg">Wybierz co chcesz zrobić</p>
      </div>
       
      <div className="flex max-[800px]:flex-col gap-2">
       



        <div onClick={() => router.push("/auth/login")} className="cursor-pointer w-65 h-85 rounded-xl 
          shadow-lg p-5 flex flex-col justify-between group  bg-gray-700/10 backdrop-blur-sm  hover:shadow-2xl
           transition-shadow duration-300 max-[800px]:w-80 max-[800px]:h-50 max-[400px]:w-70" >
          
          <h3 className="text-2xl font-semibold max-[800px]:text-xl">Witaj ponownie.<br/>Zaloguj się</h3>

<div >
 
   <Image
            src="/logIcon.png" alt="img" width={80} height={50} style={{ color:"blue"}}
            className="object-contain group-hover:brightness-125 ml-auto max-[800px]:w-16" 
            unoptimized priority
            
            />  

           
</div>


        </div>

        <div onClick={() => router.push("/auth/register")} className="cursor-pointer w-65 h-85 rounded-xl 
          shadow-lg p-5 flex flex-col justify-between group  bg-gray-700/10 backdrop-blur-sm hover:shadow-2xl 
          transition-shadow duration-300 max-[800px]:w-80 max-[800px]:h-50 max-[400px]:w-70">
      
          <h3 className="text-2xl font-semibold max-[800px]:text-xl">Aby dołączyć, Zarejestruj się</h3>
        
          <div>


            <Image
            src="/regIcon.png" alt="img" width={80} height={50}
            className="object-contain group-hover:brightness-125 ml-auto max-[800px]:w-16" unoptimized priority
            />  
     
            </div>
        </div>

      </div>
      </div>

      
    </main>
  );
}


