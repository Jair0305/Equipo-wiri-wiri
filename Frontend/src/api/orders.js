// ---------------------  GET ACTIVE ORDERS (READ)
export async function getOrders() {
  const response = await fetch('http://127.0.0.1:8080/order')
  const result = await response.json()
  return result
}

export async function getAllOrders() {
  const response = await fetch('http://127.0.0.1:8080/order/all')
  const result = await response.json()
  return result
}
