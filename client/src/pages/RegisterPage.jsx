import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

function RegisterPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
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
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Full name is required.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name =
        "Name must contain at least 2 characters.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!formData.email.includes("@")) {
      newErrors.email =
        "Enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password =
        "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password =
        "Password must contain at least 8 characters.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        "Confirm your password.";
    } else if (
      formData.password !==
      formData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match.";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms =
        "You must agree to the Terms and Privacy Policy.";
    }

    return newErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors =
      validateForm();

    if (
      Object.keys(validationErrors).length > 0
    ) {
      setErrors(validationErrors);
      return;
    }

    const registrationData = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      password: formData.password,
    };

    console.log(
      "Registration form data:",
      registrationData
    );

    navigate("/dashboard");
  }

  return (
    <AuthLayout
      title="REGISTER"
      subtitle="Create your personal space for saving and rediscovering knowledge."
      bottomText="Already have an account?"
      bottomLinkText="Login"
      bottomLinkTo="/login"
    >
      <form
        className="auth-form"
        onSubmit={handleSubmit}
        noValidate
      >
        <div className="auth-input-group">
          <label htmlFor="register-name">
            Full name
          </label>

          <input
            id="register-name"
            name="name"
            type="text"
            placeholder="FULL NAME"
            value={formData.name}
            onChange={handleChange}
            className={
              errors.name
                ? "auth-input-error"
                : ""
            }
          />

          {errors.name && (
            <p className="auth-error-message">
              {errors.name}
            </p>
          )}
        </div>

        <div className="auth-input-group">
          <label htmlFor="register-email">
            Email address
          </label>

          <input
            id="register-email"
            name="email"
            type="email"
            placeholder="EMAIL ADDRESS"
            value={formData.email}
            onChange={handleChange}
            className={
              errors.email
                ? "auth-input-error"
                : ""
            }
          />

          {errors.email && (
            <p className="auth-error-message">
              {errors.email}
            </p>
          )}
        </div>

        <div className="auth-input-group">
          <label htmlFor="register-password">
            Password
          </label>

          <div className="auth-password-wrapper">
            <input
              id="register-password"
              name="password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="MINIMUM 8 CHARACTERS"
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
                  (currentValue) =>
                    !currentValue
                )
              }
            >
              {showPassword
                ? "Hide"
                : "Show"}
            </button>
          </div>

          {errors.password && (
            <p className="auth-error-message">
              {errors.password}
            </p>
          )}
        </div>

        <div className="auth-input-group">
          <label htmlFor="register-confirm-password">
            Confirm password
          </label>

          <input
            id="register-confirm-password"
            name="confirmPassword"
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="CONFIRM PASSWORD"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={
              errors.confirmPassword
                ? "auth-input-error"
                : ""
            }
          />

          {errors.confirmPassword && (
            <p className="auth-error-message">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <label className="auth-checkbox-label auth-terms-label">
          <input
            name="agreeToTerms"
            type="checkbox"
            checked={
              formData.agreeToTerms
            }
            onChange={handleChange}
          />

          <span>
            I agree to the Terms and Privacy Policy
          </span>
        </label>

        {errors.agreeToTerms && (
          <p className="auth-error-message">
            {errors.agreeToTerms}
          </p>
        )}

        <button
          className="auth-submit-button"
          type="submit"
        >
          CREATE ACCOUNT
        </button>
      </form>
    </AuthLayout>
  );
}

export default RegisterPage;