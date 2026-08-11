import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import {
  loginUser,
  saveAuthToken,
} from "../services/authApi";

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));

    setServerError("");
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!formData.email.includes("@")) {
      newErrors.email = "Enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    }

    return newErrors;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    setServerError("");

    try {
      const data = await loginUser({
        email: formData.email.trim(),
        password: formData.password,
      });

      saveAuthToken(data.token);

      navigate("/dashboard");
    } catch (error) {
      setServerError(
        error.message || "Unable to login. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Log in to rediscover everything you saved."
      bottomText="Don't have an account?"
      bottomLinkText="Create account"
      bottomLinkTo="/register"
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        {serverError && (
          <p className="auth-error-message">
            {serverError}
          </p>
        )}

        <div className="auth-input-group">
          <label htmlFor="login-email">
            Email address
          </label>

          <input
            id="login-email"
            name="email"
            type="email"
            placeholder="EMAIL ADDRESS"
            value={formData.email}
            onChange={handleChange}
            className={
              errors.email ? "auth-input-error" : ""
            }
          />

          {errors.email && (
            <p className="auth-error-message">
              {errors.email}
            </p>
          )}
        </div>

        <div className="auth-input-group">
          <label htmlFor="login-password">
            Password
          </label>

          <div className="auth-password-wrapper">
            <input
              id="login-password"
              name="password"
              type={
                showPassword ? "text" : "password"
              }
              placeholder="PASSWORD"
              value={formData.password}
              onChange={handleChange}
              className={
                errors.password
                  ? "auth-input-error"
                  : ""
              }
            />

            <button
              className="auth-password-toggle"
              type="button"
              onClick={() =>
                setShowPassword(
                  (currentValue) => !currentValue
                )
              }
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {errors.password && (
            <p className="auth-error-message">
              {errors.password}
            </p>
          )}
        </div>

        <div className="auth-form-options">
          <label className="auth-checkbox-label">
            <input
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleChange}
            />

            <span>Remember me</span>
          </label>

          <Link
            className="auth-forgot-link"
            to="/forgot-password"
          >
            Forgot password?
          </Link>
        </div>

        <button
          className="auth-submit-button"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? "LOGGING IN..." : "LOGIN"}
        </button>
      </form>
    </AuthLayout>
  );
}

export default LoginPage;