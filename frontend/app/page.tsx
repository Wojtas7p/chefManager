"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      router.replace("/dashboard"); // automatyczne przekierowanie jeśli zalogowany
    }
  }, [user, router]);

  return (
    <section className="m-50">
      <h1>flowgastro.com</h1>
      <h2>workflowgastro.com</h2>
      <h3>Gastronomia bez wysiłku</h3>
      <p>Remote management, SaaS, mobile-first</p>
    </section>
  );
}


