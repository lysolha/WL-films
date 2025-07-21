const API_URL = import.meta.env.VITE_API_URL;

export async function login(data: { email: string; password: string }) {
  const response = await fetch(`${API_URL}/sessions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  const response = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}
