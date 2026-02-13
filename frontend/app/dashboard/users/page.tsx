// dashboard/users/page.tsx

"use client";

import { useState } from "react";
import { createUser} from "@/lib/api";
import { RegisterFormErrors } from "@/types/forms.d";
import {
  isValidEmail,
  isValidPassword,
  isValidBirthDate,
} from "@/lib/validators";
import Image from "next/image";
import { PHONE_CODES } from "@/lib/phoneCodes";

export default function UsersPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [canManageSchedule, setCanManageSchedule] = useState(false);
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [phoneCountryCode, setPhoneCountryCode] = useState("+48");
  const [formError, setFormError] = useState<string | null>(null);


function validate(): RegisterFormErrors {
  const newErrors: RegisterFormErrors = {};

  if (!isValidEmail(login)) {
    newErrors.login = "Niepoprawny format email";
  }

  if (!isValidPassword(password)) {
    newErrors.password =
      "Min. 6 znaków, 1 duża litera i 1 cyfra";
  }

  if (!isValidBirthDate(birthDate)) {
    newErrors.birthDate =
      "Niepoprawna data urodzenia";
  }
  return newErrors;
}


  async function handleCreateUser() {
      const validationErrors = validate();
  setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;


    try {
  setFormError(null);
    
    await createUser({
      login,
      password,
      name,
      position,
      birthDate,
        phone: `${phoneCountryCode}${phone}`,
      permissions: { canManageSchedule },
    });

    setLogin("");
    setPassword("");
    setName("");
    setCanManageSchedule(false);

   } catch (err: any) {
  setFormError(err.message);
  }

  }
  
  return (
    <main className="main">

     <Image
             src="/bgUserPage.png"
             alt="Tło logowania"
            fill
            priority
            className="object-cover"
          />  
                          
           <div className="absolute z-10 inset-0 bg-white/30 " />




    <div className=" flex flex-col pt-24 relative z-20 gap-10 items-center 
max-[400px]:min-w-[300px] max-[400px]:pt-24 max-[400px]:gap-2">

      <section className="rounded-lg p-8 m-4 relative z-20 flex flex-col bg-gray-100/10 backdrop-blur-sm 
         w-140 shadow-lg max-[800px]:w-100 max-[400px]:w-80">


        <h2>Dodaj użytkownika</h2>



<div className="relative">
        <input  className="input-form" placeholder="Nazwa" value={name} onChange={e => setName(e.target.value)} />
        <input
         className="input-form"
         placeholder="Login (email)"
         value={login}
         onChange={e => setLogin(e.target.value)}/>
         {errors.login && <p  className="err-form">{errors.login}</p>}
</div>

<div className="relative">
        <input
         className="input-form"
  type="password"
  placeholder="Hasło"
  value={password}
  onChange={e => setPassword(e.target.value)}/>
  {errors.password && (
  <p  className="err-form">{errors.password}</p>
 )}
</div>

        <input  className="input-form" placeholder="Stanowisko" value={position} onChange={e => setPosition(e.target.value)}/>

<div className="relative">      
<input
 className="input-form"
  type="date"
  value={birthDate}
  onChange={e => setBirthDate(e.target.value)}
/>
{errors.birthDate && (
  <p  className="err-form">{errors.birthDate}</p>
)}
</div>  

<div className="flex gap-3">
 <select
  className="input-form flex-[4]"
        value={phoneCountryCode}
        onChange={e => setPhoneCountryCode(e.target.value)}
      >
        {PHONE_CODES.map(c => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>

<input
  className="input-form flex-[6]" 
  placeholder="Numer telefonu"
  value={phone}
  onChange={e => setPhone(e.target.value.replace(/\D/g, "")) }
  inputMode="numeric"
  pattern="[0-9]*"
/>
</div>

<div className="relative">
        <label className="flex gap-3">
          <input className="accent-[#2E8A80]" 
          type="checkbox" checked={canManageSchedule}onChange={e => setCanManageSchedule(e.target.checked)}/>
          Może zarządzać grafikiem
        </label>

        {formError && (
  <p   className="err-form" >
    {formError}
  </p>
)}
</div>

        <button className="button-form cursor-pointer opacity-100 hover:bg-[#32A293]" 
        onClick={handleCreateUser}>Dodaj</button>
      </section>

    </div>
    </main>
  );
}
