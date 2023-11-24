// ---------------------  GET PRODUCTS (READ)
export async function getProducts() {
  const response = await fetch('../../database.json')
  const result = await response.json()
  return result
}

export async function postProduct(product) {
  const response = await fetch('../../database.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  })
  const result = await response.json()
  return result
}
