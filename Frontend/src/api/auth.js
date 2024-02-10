const apiUrl = "https://127.0.0.1:8080";

// ---------------- POST (Login) ----------------

export async function loginApi(username, password) {
  const response = await fetch(`${apiUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user: { username, password } }),
  });
  return response;
}
