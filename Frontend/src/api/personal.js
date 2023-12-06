// ---------------------  GET ALL EMPLOYEES (READ)
export async function getAllEmployees() {
  const response = await fetch('http://127.0.0.1:8080/personal')
  const result = await response.json()
  return result
}

export async function getActiveEmployees() {
  const response = await fetch('http://127.0.0.1:8080/personal/active')
  const result = await response.json()
  return result
}

// ---------------------  POST EMPLOYEE (CREATE)
export async function postEmployee(employee) {
  const response = await fetch('http://127.0.0.1:8080/personal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee),
  })
  return response
}

export async function putEmployee(id, employee) {
  const response = await fetch(`http://127.0.0.1:8080/personal/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(employee),
  })
  return response
}
