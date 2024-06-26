// ---------------------  GET PRODUCTS (READ)
export async function getProducts() {
  // const response = await fetch('../../database.json')
  const response = await fetch('http://127.0.0.1:8080/product/all')
  const result = await response.json()
  return result
}
export async function getAdminProducts() {
  // const response = await fetch('../../database.json')
  const response = await fetch('http://127.0.0.1:8080/product/admin/all')
  const result = await response.json()
  return result
}

// -------------------- POST PRODUCT (CREATE)
export async function postOrder(product) {
  // const response = await fetch('../../database.json',
  const response = await fetch('http://127.0.0.1:8080/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })
  const result = await response.json()
  return result
}
