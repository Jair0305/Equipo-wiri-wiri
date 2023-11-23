// ---------------------  GET PRODUCTS (READ)
export async function getProducts() {
  const response = await fetch('http://127.0.0.1:8080/product')
  const result = await response.json()
  return result
}
