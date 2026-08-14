import { getAuthToken } from "./authApi";

const API_BASE_URL =
  "https://recall-app-y0vp.onrender.com/api";

async function parseResponse(response) {
  const contentType =
    response.headers.get("content-type") || "";

  if (contentType.includes("application/json")) {
    return await response.json();
  }

  const text = await response.text();

  return {
    success: false,
    message:
      text ||
      `Request failed with status ${response.status}.`,
  };
}

async function request(
  endpoint,
  options = {}
) {
  const token = getAuthToken();

  const headers = {
    ...(options.headers || {}),
  };

  if (
    options.body &&
    !(options.body instanceof FormData)
  ) {
    headers["Content-Type"] =
      "application/json";
  }

  if (token) {
    headers.Authorization =
      `Bearer ${token}`;
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}${endpoint}`,
      {
        ...options,
        headers,
      }
    );

    const data =
      await parseResponse(response);

    if (!response.ok) {
      throw new Error(
        data.message ||
          `Request failed with status ${response.status}.`
      );
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        "Unable to connect to the Recall server. Please try again in a moment."
      );
    }

    throw error;
  }
}

export async function fetchItems() {
  return request("/items", {
    method: "GET",
  });
}

export async function createItem(itemData) {
  return request("/items", {
    method: "POST",
    body: JSON.stringify(itemData),
  });
}

export async function updateItem(
  itemId,
  itemData
) {
  return request(
    `/items/${itemId}`,
    {
      method: "PUT",
      body: JSON.stringify(itemData),
    }
  );
}

export async function deleteItem(
  itemId
) {
  return request(
    `/items/${itemId}`,
    {
      method: "DELETE",
    }
  );
}

export async function toggleFavourite(
  itemId
) {
  return request(
    `/items/${itemId}/favourite`,
    {
      method: "PATCH",
    }
  );
}

export async function createShare(
  itemId,
  expiresIn
) {
  return request(
    `/items/${itemId}/share`,
    {
      method: "POST",
      body: JSON.stringify({
        expiresIn,
      }),
    }
  );
}

export async function regenerateShare(
  itemId
) {
  return request(
    `/items/${itemId}/share/regenerate`,
    {
      method: "POST",
    }
  );
}

export async function disableShare(
  itemId
) {
  return request(
    `/items/${itemId}/share/disable`,
    {
      method: "PATCH",
    }
  );
}

export async function fetchSharedItem(
  shareCode
) {
  return request(
    `/shared/${encodeURIComponent(
      shareCode
    )}`,
    {
      method: "GET",
    }
  );
}