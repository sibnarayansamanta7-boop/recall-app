import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { loginUser } from "../services/authApi";

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  function handleChange(event) {
    const { name, value } =
      event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (
      !formData.email.trim() ||
      !formData.password
    ) {
      setError(
        "Please enter your email and password."
      );
      return;
    }

    try {
      setLoading(true);

      const data =
        await loginUser(formData);

      const token =
        data?.token ||
        data?.accessToken;

      if (!token) {
        throw new Error(
          "Login succeeded, but no authentication token was returned."
        );
      }

      localStorage.setItem(
        "recall_token",
        token
      );

      localStorage.setItem(
        "token",
        token
      );

      if (data?.user) {
        localStorage.setItem(
          "recall_user",
          JSON.stringify(data.user)
        );
      }

      navigate("/dashboard");
    } catch (err) {
      setError(
        err?.message ||
          "Unable to log in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Continue rediscovering the things that matter."
      footerText="Don't have an account?"
      footerLinkText="Create one"
      footerLinkTo="/register"
    >
      <form
        className="auth-form"
        onSubmit={handleSubmit}
      >
        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <div className="auth-input-group">
          <label htmlFor="email">
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            autoComplete="email"
            required
          />
        </div>

        <div className="auth-input-group">
          <div className="auth-label-row">
            <label htmlFor="password">
              Password
            </label>
          </div>

          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            autoComplete="current-password"
            required
          />
        </div>

        <button
          type="submit"
          className="auth-submit-button"
          disabled={loading}
        >
          {loading
            ? "Signing in..."
            : "Sign in"}
        </button>
      </form>

      <div className="auth-small-note">
        <span>🔒</span>
        Your saved memories stay private.
      </div>
    </AuthLayout>
  );
}

export default LoginPage;