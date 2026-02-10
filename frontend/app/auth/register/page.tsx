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
import Link from "next/link";




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
    <main className="main" >
   
          <Image
                 src="/bgLineT.svg"
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
            " unoptimized priority /> 

</Link>

<div className=" flex flex-col pt-14 relative z-20 gap-6 items-center max-[400px]:pt-18 
max-[400px]:min-w-[300px] max-[400px]:gap-1">
       
     <div className="flex flex-col items-center">
        <Link href="/">
  <Image
            src="/logoFlowGastro.png" alt="Logo" width={220} height={50}
            className="object-contain mb-6 max-[800px]:w-50" unoptimized priority
          /> 
        </Link>
    <h1 className="text-xl font-semibold max-[400px]:text-lg">Dołącz do FlowGastro</h1>

   </div>

        <div className="rounded-lg p-8 m-4 relative z-20 flex flex-col bg-gray-100/10 backdrop-blur-sm 
         w-140 shadow-lg max-[800px]:w-100 max-[400px]:w-80 max-[400px]:m-2 " > 
 <div className="relative">
 
        <input
       className="input-form" 
        placeholder="Adres e-mail"
        value={form.login}
        onChange={e => update("login", e.target.value)}
      />
      {submitted && errors.login && <p className="err-form bottom-2">{errors.login}</p>}
  </div> 

  <div className="relative">
  
      <input
       className="input-form" 
        type="password"
        placeholder="Hasło"
        value={form.password}
        onChange={e => update("password", e.target.value)}
      />
      {submitted && errors.password && <p className="err-form">{errors.password}</p>}
    </div>

        <input
        className="input-form" 
        placeholder="Nazwa firmy"
        value={form.name}
        onChange={e => update("name", e.target.value)}
      />

      <input
       className="input-form" 
        placeholder="Stanowisko"
        value={form.position}
        onChange={e => update("position", e.target.value)}
      />

       <div className="flex gap-2  max-[800px]:flex-col">
      <select
        value={form.phoneCountryCode}
        onChange={e => update("phoneCountryCode", e.target.value)}
        className="input-form flex-[3] "
      >
        {PHONE_CODES.map(c => (
          <option key={c.value} value={c.value} className=" bg-gray-200">
            {c.label}
          </option>
        ))}
      </select>
        <div className="relative">
      <input
       className="input-form flex-[7]" 
        placeholder="Numer telefonu"
        value={form.phoneNumber}
        onChange={e => update("phoneNumber", e.target.value.replace(/\D/g, ""))}
      />
      {submitted && errors.phoneNumber && <p className="err-form">{errors.phoneNumber}</p>}
      </div>
      </div>
       
     <div className="relative">
        
         <input
        className="input-form" 
        type="date"
        value={form.birthDate}
        onChange={e => update("birthDate", e.target.value)}
      />
      {submitted && errors.birthDate && <p className="err-form">{errors.birthDate}</p>}
     </div>
    
      <button
        onClick={handleRegister}
        disabled={!allFieldsFilled}
         className={` button-form transition-opacity duration-200 ${
    !allFieldsFilled ? "opacity-50 cursor-not-allowed" : "opacity-100 cursor-pointer hover:bg-[#32A293]"
     }`}
      >
        Zarejestruj
      </button>
      </div>

      </div>

    </main>
  );
}
