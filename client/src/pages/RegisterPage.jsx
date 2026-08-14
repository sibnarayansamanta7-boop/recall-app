import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { registerUser } from "../services/authApi";

function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
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
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError(
        "Please fill in all fields."
      );
      return;
    }

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    if (formData.password.length < 6) {
      setError(
        "Password must be at least 6 characters."
      );
      return;
    }

    try {
      setLoading(true);

      const data =
        await registerUser({
          name: formData.name.trim(),
          email: formData.email.trim(),
          password: formData.password,
        });

      const token =
        data?.token ||
        data?.accessToken;

      if (token) {
        localStorage.setItem(
          "recall_token",
          token
        );

        localStorage.setItem(
          "token",
          token
        );
      }

      if (data?.user) {
        localStorage.setItem(
          "recall_user",
          JSON.stringify(data.user)
        );
      }

      navigate(
        token
          ? "/dashboard"
          : "/login"
      );
    } catch (err) {
      setError(
        err?.message ||
          "Unable to create your account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Create your Recall"
      subtitle="Build a personal memory space for everything worth finding again."
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkTo="/login"
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
          <label htmlFor="name">
            Name
          </label>

          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            autoComplete="name"
            required
          />
        </div>

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
          <label htmlFor="password">
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="At least 6 characters"
            autoComplete="new-password"
            required
          />
        </div>

        <div className="auth-input-group">
          <label htmlFor="confirmPassword">
            Confirm password
          </label>

          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Enter your password again"
            autoComplete="new-password"
            required
          />
        </div>

        <button
          type="submit"
          className="auth-submit-button"
          disabled={loading}
        >
          {loading
            ? "Creating account..."
            : "Create account"}
        </button>
      </form>

      <div className="auth-small-note">
        <span>✨</span>
        Start building your personal knowledge memory.
      </div>
    </AuthLayout>
  );
}

export default RegisterPage;