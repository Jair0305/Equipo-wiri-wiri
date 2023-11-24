// ---------------------  GET PRODUCTS (READ)
export async function getProducts() {
  // const response = await fetch('../../database.json')
  const response = await fetch('http://127.0.0.1:8080/product/all')
  const result = await response.json()
  return result
}

export async function postProduct(product) {
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
