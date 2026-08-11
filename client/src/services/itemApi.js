const API_BASE_URL = "http://localhost:8001/api";

function getAuthToken() {
  return localStorage.getItem("recall_token");
}

function getAuthHeaders() {
  const token = getAuthToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}

export async function fetchItems() {
  const response = await fetch(
    `${API_BASE_URL}/items`,
    {
      method: "GET",
      headers: getAuthHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(
      data.message ||
        "Failed to load saved items."
    );
  }

  return data;
}

export async function createItem(itemData) {
  const response = await fetch(
    `${API_BASE_URL}/items`,
    {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(itemData),
    }
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(
      data.message ||
        "Failed to save item."
    );
  }

  return data;
}

export async function updateItem(
  itemId,
  itemData
) {
  const response = await fetch(
    `${API_BASE_URL}/items/${itemId}`,
    {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(itemData),
    }
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(
      data.message ||
        "Failed to update item."
    );
  }

  return data;
}

export async function toggleFavourite(
  itemId
) {
  const response = await fetch(
    `${API_BASE_URL}/items/${itemId}/favourite`,
    {
      method: "PATCH",
      headers: getAuthHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(
      data.message ||
        "Failed to update favourite."
    );
  }

  return data;
}

export async function deleteItem(itemId) {
  const response = await fetch(
    `${API_BASE_URL}/items/${itemId}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(
      data.message ||
        "Failed to delete item."
    );
  }

  return data;
}