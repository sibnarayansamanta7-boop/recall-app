import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { registerUser } from "../services/authApi";

function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    if (!formData.name || !formData.email || !formData.password) {
      setError("Please complete all required fields.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const data = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (data?.token) {
        localStorage.setItem("token", data.token);
      }

      navigate("/dashboard");
    } catch (requestError) {
      setError(
        requestError.message ||
          "Unable to create your account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout
      title="Create your memory space"
      subtitle="Start saving the things you know you'll want to find again."
      bottomText="Already have an account?"
      bottomLinkText="Sign in"
      bottomLinkTo="/login"
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="auth-input-group">
          <label htmlFor="name">Name</label>

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
              placeholder="At least 6 characters"
              autoComplete="new-password"
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

        <div className="auth-input-group">
          <label htmlFor="confirmPassword">Confirm password</label>

          <div className="auth-password-wrapper">
            <input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Repeat your password"
              autoComplete="new-password"
              required
            />

            <button
              type="button"
              className="auth-password-toggle"
              onClick={() =>
                setShowConfirmPassword((value) => !value)
              }
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {error && <p className="auth-error-message">{error}</p>}

        <label className="auth-checkbox-label auth-terms-label">
          <input type="checkbox" required />
          <span>
            I agree to use Recall responsibly and keep my account secure.
          </span>
        </label>

        <button
          className="auth-submit-button"
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating account..." : "Create account"}
        </button>

        <p className="auth-security-note">
          🔒 Your saved knowledge stays private.
        </p>
      </form>

      <div className="auth-mobile-register">
        Already have an account?{" "}
        <Link to="/login">Sign in</Link>
      </div>
    </AuthLayout>
  );
}

export default RegisterPage;