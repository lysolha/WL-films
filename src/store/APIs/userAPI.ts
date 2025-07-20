export async function login(data: { email: string; password: string }) {
  const response = await fetch('http://localhost:8000/api/v1/sessions', {
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
  const response = await fetch('http://localhost:8000/api/v1/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}
