"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import HeaderSection from "@/components/home/HeaderSection";
import MainSection from "@/components/home/MainSection";
import ContentSection from "@/components/home/ContentSection";
import FooterSection from "@/components/home/FooterSection";
import Image from "next/image";

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.replace("/dashboard"); // automatyczne przekierowanie jeśli zalogowany
    }
  }, [user, router]);

  return (
    <>
    <main className="main">
        <Image
              src="/bgUserHome.png"
              alt="Tło logowania"
              fill
              priority
              className="object-cover"
            />         
            <div className="absolute z-10 inset-0 bg-white/10 " />

         <div className="flex flex-col relative z-20 w-full">

           <HeaderSection />
           <MainSection />
           < ContentSection />
           < FooterSection />
  
         </div>

    </main>

    </>
   
  );
}


