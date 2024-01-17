const apiUrl = 'https://munchez.onrender.com'

// ---------------------  GET ALL EMPLOYEES (READ)
export async function getAllEmployees() {
  const response = await fetch(`${apiUrl}/personal`)
  const result = await response.json()
  return result
}

export async function getActiveEmployees() {
  const response = await fetch(`${apiUrl}/personal/active`)
  const result = await response.json()
  return result
}

// ---------------------  POST EMPLOYEE (CREATE)
export async function postEmployee(employee) {
  const response = await fetch(`${apiUrl}/personal/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee),
  })
  return response
}

// ---------------------  PUT EMPLOYEE (EDIT)

export async function putEmployee(id, employee) {
  const response = await fetch(`${apiUrl}/personal/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee),
  })
  return response
}

// ---------------------  DELETE EMPLOYEE (DELETE)

export async function deleteEmployee(id) {
  const response = await fetch(`${apiUrl}/personal/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
  return response
}

// ---------------------  POST USER (REGISTER)

export async function postUser(user) {
  const response = await fetch(`${apiUrl}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user),
  })
  return response
}
