"use client";

import { useState, useEffect } from "react";
import { register} from "@/lib/api";
import { useRouter } from "next/navigation";
import { RegisterFormData , RegisterFormErrors} from "@/types/forms.d";
import {
  isValidEmail,
  isValidPassword,
  isValidBirthDate,
  isValidPhoneNumber,
} from "@/lib/validators";
import { PHONE_CODES } from "@/lib/phoneCodes";
import "./../../globals.css";
import Image from "next/image";




export default function RegisterPage() {
    const router = useRouter();

    const [form, setForm] = useState<RegisterFormData>({
  name: "",
  position: "",
  birthDate: "",
  phoneCountryCode: "+48",
  phoneNumber: "",
  login: "",
  password: "",
});

const [errors, setErrors] = useState<RegisterFormErrors>({});
const [submitted, setSubmitted] = useState(false); 


const update = (key: keyof RegisterFormData, value: string) =>
  setForm(prev => ({ ...prev, [key]: value }));

  const allFieldsFilled =
    form.name &&
    form.position &&
    form.birthDate &&
    form.phoneNumber &&
    form.login &&
    form.password;

    const validate = (): RegisterFormErrors => {
    const newErrors: RegisterFormErrors = {};

    if (!isValidEmail(form.login)) newErrors.login = "Niepoprawny format emaila";
    if (!isValidPassword(form.password)) newErrors.password = "Hasło musi mieć min. 6 znaków, dużą literę i cyfrę";
    if (!isValidBirthDate(form.birthDate)) newErrors.birthDate = "Niepoprawny rok urodzenia";
    if (!isValidPhoneNumber(form.phoneNumber)) newErrors.phoneNumber = "Wpisz numer telefonu";

    return newErrors;
  };


 const handleRegister = async () => {
    setSubmitted(true);

    const validationErrors = validate();
    setErrors(validationErrors);

    if (!allFieldsFilled || Object.keys(validationErrors).length > 0) return;

    try {
  const res = await register({
    ...form,
    phone: `${form.phoneCountryCode}${form.phoneNumber}`,
  });

  if (res.requireOtp) {
    sessionStorage.setItem("pendingLogin", form.login);
    sessionStorage.setItem("devOtp", res.otp || "");
    router.push("/auth/otp");
  }
} catch (err: any) {
  if (err.code === "LOGIN_EXISTS") {
    setErrors(prev => ({ ...prev, login: "Ten login jest już zajęty" }));
  } else {
    setErrors(prev => ({ ...prev, login: err.message }));
  }
}
  };

useEffect(() => {
  const newErrors: RegisterFormErrors = {};

  if (form.login && !isValidEmail(form.login)) {
    newErrors.login = "Niepoprawny format emaila";
  }

  if (form.password && !isValidPassword(form.password)) {
    newErrors.password = "Hasło musi mieć min. 6 znaków, dużą literę i cyfrę";
  }

  if (form.birthDate && !isValidBirthDate(form.birthDate)) {
    newErrors.birthDate = "Niepoprawny rok urodzenia";
  }

  if (form.phoneNumber && !isValidPhoneNumber(form.phoneNumber)) {
    newErrors.phoneNumber = "Wpisz numer telefonu";
  }

  setErrors(newErrors);
}, [form]);



  return (
    <main  className="w-[100vw] h-[100vh] relative  overflow-hidden" >



        <Image
              src="/img1.jpg"
              alt="Tło logowania"
              fill
              priority
               className="object-cover"
            />
      
        <div
           
              className="absolute z-10 inset-0 bg-white/10"
            />




        <div className="rounded-xl p-8 m-4 relative z-20 flex flex-col bg-gray-700/50 backdrop-blur-sm 
         w-140 " > 


       
        
      <h1>Rejestracja</h1>
    

        <input
       className="input-form" 
        placeholder="Email (login)"
        value={form.login}
        onChange={e => update("login", e.target.value)}
      />
      {submitted && errors.login && <p style={{ color: "red" }}>{errors.login}</p>}

      <input
       className="input-form" 
        type="password"
        placeholder="Hasło"
        value={form.password}
        onChange={e => update("password", e.target.value)}
      />
      {submitted && errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

        <input
        className="input-form" 
        placeholder="Nazwa"
        value={form.name}
        onChange={e => update("name", e.target.value)}
      />

      <input
       className="input-form" 
        placeholder="Stanowisko"
        value={form.position}
        onChange={e => update("position", e.target.value)}
      />

       <div className="flex gap-2">
      <select
        value={form.phoneCountryCode}
        onChange={e => update("phoneCountryCode", e.target.value)}
        className="-full px-4 py-2 border-b border-gray-400
           focus:outline-none focus:ring-2 focus:ring-blue-500 
           bg-transparent text-white mb-2 flex-[3] "
      >
        {PHONE_CODES.map(c => (
          <option key={c.value} value={c.value} className=" bg-gray-600">
            {c.label}
          </option>
        ))}
      </select>

      <input
       className="input-form flex-[7]" 
        placeholder="Numer telefonu"
        value={form.phoneNumber}
        onChange={e => update("phoneNumber", e.target.value.replace(/\D/g, ""))}
      />
      {submitted && errors.phoneNumber && <p style={{ color: "red" }}>{errors.phoneNumber}</p>}
      </div>

         <input
        className="input-form" 
        type="date"
        value={form.birthDate}
        onChange={e => update("birthDate", e.target.value)}
      />
      {submitted && errors.birthDate && <p style={{ color: "red" }}>{errors.birthDate}</p>}
    
      <button
        onClick={handleRegister}
        disabled={!allFieldsFilled}
        style={{
          opacity: !allFieldsFilled ? 0.5 : 1,
          cursor: !allFieldsFilled ? "not-allowed" : "pointer",
        }}
      >
        Zarejestruj
      </button>
      </div>

    </main>
  );
}
