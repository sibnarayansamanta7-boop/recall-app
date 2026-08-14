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

async function apiRequest(endpoint, options = {}) {
  try {
    const response = await fetch(
      `${API_BASE_URL}${endpoint}`,
      {
        ...options,
        headers: {
          ...(options.headers || {}),
          "Content-Type":
            options.body &&
            !(options.body instanceof FormData)
              ? "application/json"
              : undefined,
        },
      }
    );

    const data = await parseResponse(response);

    if (!response.ok || data.success === false) {
      throw new Error(
        data.message ||
          `Request failed with status ${response.status}.`
      );
    }

    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error(
        "Unable to connect to Recall server. Please check that the backend is online."
      );
    }

    throw error;
  }
}

export async function registerUser(userData) {
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

export async function loginUser(credentials) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export function saveAuthToken(token) {
  localStorage.setItem(
    "recall_token",
    token
  );
}

export function getAuthToken() {
  return localStorage.getItem(
    "recall_token"
  );
}

export function removeAuthToken() {
  localStorage.removeItem(
    "recall_token"
  );
}

export async function getCurrentUser() {
  const token = getAuthToken();

  if (!token) {
    throw new Error(
      "Authentication required."
    );
  }

  return apiRequest("/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((data) => data.user);
}