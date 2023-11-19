// ---------------------  GET PRODUCTS (READ)
export async function getProducts() {
  const response = await fetch('../../database.json')
  const result = await response.json()
  return result
}
