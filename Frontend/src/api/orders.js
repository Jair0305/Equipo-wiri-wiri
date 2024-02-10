const apiUrl = "https://127.0.0.1:8080";

// ---------------------  GET ACTIVE ORDERS (READ)
export async function getOrders() {
  const response = await fetch(`${apiUrl}/order`);
  const result = await response.json();
  return result;
}

export async function getAllOrders() {
  const response = await fetch(`${apiUrl}/order/all`);
  const result = await response.json();
  return result;
}

// -------------------- POST ORDER (CREATE)

export async function postOrder(product) {
  const response = await fetch(`${apiUrl}/order`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  const result = await response.json();
  return result;
}

// -------------------- UPDATE ORDER (UPDATE)

// -------------------- MARK ORDER AS READY (DELETE)

export async function markOrderAsReadyApi(id) {
  const response = await fetch(`${apiUrl}/order/deliveredorder/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}

// -------------------- CANCEL ORDER (DELETE)
export const cancelOrderApi = async (id) => {
  const response = await fetch(`${apiUrl}/order/cancelorder/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

// -------------------- DELETE ORDER (DELETE)

export async function deleteOrderApi(id) {
  const response = await fetch(`${apiUrl}/order/deleteone/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
}
