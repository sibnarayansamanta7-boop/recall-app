const API_BASE_URL = "http://localhost:8001/api";

export async function fetchItems() {
  const response = await fetch(`${API_BASE_URL}/items`);

  if (!response.ok) {
    throw new Error("Failed to load saved items.");
  }

  const data = await response.json();

  return Array.isArray(data.items)
    ? data.items
    : [];
}

export async function createItem(itemData) {
  const response = await fetch(`${API_BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(itemData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to save item."
    );
  }

  return data.item;
}

export async function deleteItem(itemId) {
  const response = await fetch(
    `${API_BASE_URL}/items/${itemId}`,
    {
      method: "DELETE",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to delete item."
    );
  }

  return data;
}