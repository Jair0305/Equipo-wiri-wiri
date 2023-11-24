// ---------------------  GET ORDERS (READ)
export async function getOrders() {
  const response = await fetch('../../databaseOrders.json')
  const result = await response.json()
  return result
}
