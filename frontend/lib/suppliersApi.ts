// suppliersApi.ts

const API = "http://localhost:5000/api"

export async function apiFetch(
  endpoint: string,
  options: RequestInit = {}
) {
  const res = await fetch(`${API}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      ...(options.headers || {}),
    },
  })

  if (!res.ok) {
    throw new Error(`API error ${res.status}`)
  }

  return res.json()
}
