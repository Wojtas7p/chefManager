
export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isValidPassword(password: string): boolean {
  return password.length >= 6 && /[A-Z]/.test(password) && /\d/.test(password);
}

export function isValidBirthDate(date: string): boolean {
  const d = new Date(date);
  const now = new Date();
  const minYear = now.getFullYear() - 150;
  const year = d.getFullYear();
  return !isNaN(d.getTime()) && year >= minYear && d <= now;
}

export function isValidPhoneNumber(phone: string): boolean {
  return /^\d+$/.test(phone);
}
