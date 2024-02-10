const apiUrl = "https://127.0.0.1:8080";

// ---------------------  GET PRODUCTS FOR CASHIER (READ)
export async function getProducts() {
  const response = await fetch(`${apiUrl}/product/all`);
  const result = await response.json();
  return result;
}

// ---------------------  GET PRODUCTS FOR ADMIN (READ)
export async function getAdminProducts() {
  const response = await fetch(`${apiUrl}/product/admin/all`);
  const result = await response.json();
  return result;
}

// -------------------- POST PRODUCT (CREATE)

export async function postProductApi(product) {
  const response = await fetch(`${apiUrl}/product`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  return response;
}

// -------------------- PUT PRODUCT (UPDATE)

export async function putProductApi(id, newProduct) {
  const response = await fetch(`${apiUrl}/product/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newProduct),
  });
  return response;
}

// -------------------- ENABLE PRODUCT (UPDATE)

export async function enableProductApi(id, product) {
  const response = await fetch(`${apiUrl}/product/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  return response;
}

// -------------------- DELETE PRODUCT (DELETE)

export async function deleteProductApi(id) {
  const response = await fetch(`${apiUrl}/product/delete/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}

// -------------------- DISABLE PRODUCT (DELETE)

export async function disableProductApi(id) {
  const response = await fetch(`${apiUrl}/product/disable/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}
