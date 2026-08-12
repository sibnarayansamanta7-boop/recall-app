const API_BASE_URL = "https://recall-app-y0vp.onrender.com/api";



export async function registerUser(userData) {
  const response = await fetch(
    `${API_BASE_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(
      data.message || "Unable to create account."
    );
  }

  return data;
}

export async function loginUser(credentials) {
  const response = await fetch(
    `${API_BASE_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    }
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(
      data.message || "Unable to login."
    );
  }

  return data;
}

export function saveAuthToken(token) {
  localStorage.setItem("recall_token", token);
}

export function getAuthToken() {
  return localStorage.getItem("recall_token");
}

export function removeAuthToken() {
  localStorage.removeItem("recall_token");
}

export async function getCurrentUser() {
  const token = getAuthToken();

  if (!token) {
    throw new Error("Authentication required.");
  }

  const response = await fetch(
    `${API_BASE_URL}/auth/me`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(
      data.message ||
        "Unable to retrieve current user."
    );
  }

  return data.user;
}