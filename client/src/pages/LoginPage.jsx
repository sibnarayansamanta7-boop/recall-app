import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { loginUser } from "../services/authApi";

function LoginPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) {
      setError("");
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await loginUser(formData);

      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      navigate("/dashboard");
    } catch (requestError) {
      setError(
        requestError.message ||
          "Unable to log in. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue to your personal memory space."
      bottomText="Don't have an account?"
      bottomLinkText="Create one"
      bottomLinkTo="/register"
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-input-group">
          <label htmlFor="email">Email</label>

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
          <label htmlFor="password">Password</label>

          <div className="auth-password-wrapper">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
            />

            <button
              type="button"
              className="auth-password-toggle"
              onClick={() => setShowPassword((value) => !value)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="auth-form-options">
          <label className="auth-checkbox-label">
            <input type="checkbox" />
            <span>Remember me</span>
          </label>

          <span className="auth-forgot-link">
            Forgot password?
          </span>
        </div>

        {error && <p className="auth-error-message">{error}</p>}

        <button
          className="auth-submit-button"
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <p className="auth-security-note">
          🔒 Your saved knowledge stays private.
        </p>
      </form>

      <div className="auth-mobile-register">
        New to Recall?{" "}
        <Link to="/register">Create your account</Link>
      </div>
    </AuthLayout>
  );
}

export default LoginPage;