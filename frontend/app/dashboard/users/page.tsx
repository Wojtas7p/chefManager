
"use client";

import { useState } from "react";
import { createUser} from "@/lib/api";
import { RegisterFormErrors } from "@/types/forms.d";
import {
  isValidEmail,
  isValidPassword,
  isValidBirthDate,
} from "@/lib/validators";

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
    <main>
      <h1>Użytkownicy</h1>

      {/* ===== FORM ===== */}
      <section>
        <h2>Dodaj użytkownika</h2>

        <input placeholder="Nazwa" value={name} onChange={e => setName(e.target.value)} />
        <input
         placeholder="Login (email)"
         value={login}
         onChange={e => setLogin(e.target.value)}/>
         {errors.login && <p style={{ color: "red" }}>{errors.login}</p>}

        <input
  type="password"
  placeholder="Hasło"
  value={password}
  onChange={e => setPassword(e.target.value)}/>
{errors.password && (
  <p style={{ color: "red" }}>{errors.password}</p>
)}

        <input placeholder="Stanowisko" value={position} onChange={e => setPosition(e.target.value)}/>
<input
  type="date"
  value={birthDate}
  onChange={e => setBirthDate(e.target.value)}
/>
{errors.birthDate && (
  <p style={{ color: "red" }}>{errors.birthDate}</p>
)}

 <select
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
  placeholder="Numer telefonu"
  value={phone}
  onChange={e => setPhone(e.target.value.replace(/\D/g, "")) }
  inputMode="numeric"
  pattern="[0-9]*"
/>


        <label>
          <input type="checkbox" checked={canManageSchedule}onChange={e => setCanManageSchedule(e.target.checked)}/>
          Może zarządzać grafikiem
        </label>

        {formError && (
  <p style={{ color: "red", marginTop: 8 }}>
    {formError}
  </p>
)}


        <button onClick={handleCreateUser}>Dodaj</button>
      </section>

    
    </main>
  );
}
