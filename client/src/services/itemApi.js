import { getAuthToken } from "./authApi";

const API_BASE_URL =
  "http://localhost:8001/api";

export async function fetchItems() {
  const token = getAuthToken();

  const response = await fetch(
    `${API_BASE_URL}/items`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to load saved items."
    );
  }

  return data;
}

export async function createItem(itemData) {
  const token = getAuthToken();

  const response = await fetch(
    `${API_BASE_URL}/items`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(itemData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
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
  const token = getAuthToken();

  const response = await fetch(
    `${API_BASE_URL}/items/${itemId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(itemData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to update item."
    );
  }

  return data;
}

export async function deleteItem(itemId) {
  const token = getAuthToken();

  const response = await fetch(
    `${API_BASE_URL}/items/${itemId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to delete item."
    );
  }

  return data;
}

export async function toggleFavourite(
  itemId
) {
  const token = getAuthToken();

  const response = await fetch(
    `${API_BASE_URL}/items/${itemId}/favourite`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to update favourite."
    );
  }

  return data;
}

export async function createShare(
  itemId,
  expiresIn
) {
  const token = getAuthToken();

  const response = await fetch(
    `${API_BASE_URL}/items/${itemId}/share`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        expiresIn,
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to create share."
    );
  }

  return data;
}

export async function regenerateShare(
  itemId
) {
  const token = getAuthToken();

  const response = await fetch(
    `${API_BASE_URL}/items/${itemId}/share/regenerate`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to regenerate share."
    );
  }

  return data;
}

export async function disableShare(
  itemId
) {
  const token = getAuthToken();

  const response = await fetch(
    `${API_BASE_URL}/items/${itemId}/share/disable`,
    {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Failed to disable sharing."
    );
  }

  return data;
}

export async function fetchSharedItem(
  shareCode
) {
  const response = await fetch(
    `${API_BASE_URL}/shared/${shareCode}`
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message ||
        "Unable to retrieve shared item."
    );
  }

  return data;
}