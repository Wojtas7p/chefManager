export interface RegisterFormData {
  name: string;
  position: string;
  birthDate: string; // yyyy-mm-dd
  phoneCountryCode: string; // "+48"
  phoneNumber: string; // "123456789"
  login: string; // email
  password: string;
}


export interface RegisterFormErrors {
  birthDate?: string;
  phoneNumber?: string;
  login?: string;
  password?: string;
}
