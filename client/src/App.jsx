import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { useEffect, useState } from "react";

import DashboardPage from "./pages/DashboardPage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SharedItemPage from "./pages/SharedItemPage";

import {
  getAuthToken,
  getCurrentUser,
  removeAuthToken,
  saveAuthToken,
} from "./services/authApi";

function ProtectedRoute({ children }) {
  const [checkingAuth, setCheckingAuth] =
    useState(true);

  const [authenticated, setAuthenticated] =
    useState(false);

  useEffect(() => {
    let isMounted = true;

    async function verifyAuthentication() {
      const token = getAuthToken();

      if (!token) {
        if (isMounted) {
          setAuthenticated(false);
          setCheckingAuth(false);
        }

        return;
      }

      try {
        await getCurrentUser();

        if (isMounted) {
          setAuthenticated(true);
        }
      } catch (error) {
        console.error(
          "Authentication verification failed:",
          error
        );

        removeAuthToken();

        if (isMounted) {
          setAuthenticated(false);
        }
      } finally {
        if (isMounted) {
          setCheckingAuth(false);
        }
      }
    }

    verifyAuthentication();

    return () => {
      isMounted = false;
    };
  }, []);

  if (checkingAuth) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#080b16",
          color: "#94a3b8",
          fontFamily:
            "Inter, system-ui, sans-serif",
        }}
      >
        Checking your Recall session...
      </div>
    );
  }

  if (!authenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/register"
          element={<RegisterPage />}
        />

        <Route
          path="/shared/:shareCode"
          element={<SharedItemPage />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/"
              replace
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;