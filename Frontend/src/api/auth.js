const apiUrl = 'https://munchez.onrender.com'

// ---------------- POST (Login) ----------------

export async function loginApi(username, password) {
  const response = await fetch(`${apiUrl}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user: { username, password } }),
  })
  return response
}
