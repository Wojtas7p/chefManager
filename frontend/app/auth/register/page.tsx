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
    <main>
      <h1>Rejestracja</h1>
    

<input
        placeholder="Nazwa"
        value={form.name}
        onChange={e => update("name", e.target.value)}
      />

      <input
        placeholder="Stanowisko"
        value={form.position}
        onChange={e => update("position", e.target.value)}
      />

      <input
        type="date"
        value={form.birthDate}
        onChange={e => update("birthDate", e.target.value)}
      />
      {submitted && errors.birthDate && <p style={{ color: "red" }}>{errors.birthDate}</p>}

      <select
        value={form.phoneCountryCode}
        onChange={e => update("phoneCountryCode", e.target.value)}
      >
        {PHONE_CODES.map(c => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>

      <input
        placeholder="Numer telefonu"
        value={form.phoneNumber}
        onChange={e => update("phoneNumber", e.target.value.replace(/\D/g, ""))}
      />
      {submitted && errors.phoneNumber && <p style={{ color: "red" }}>{errors.phoneNumber}</p>}

      <input
        placeholder="Email (login)"
        value={form.login}
        onChange={e => update("login", e.target.value)}
      />
      {submitted && errors.login && <p style={{ color: "red" }}>{errors.login}</p>}

      <input
        type="password"
        placeholder="Hasło"
        value={form.password}
        onChange={e => update("password", e.target.value)}
      />
      {submitted && errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

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

    </main>
  );
}
