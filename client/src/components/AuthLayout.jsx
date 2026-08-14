import { Link } from "react-router-dom";
import "../styles/auth.css";

function AuthLayout({
  children,
  title,
  description,
  eyebrow = "YOUR PERSONAL KNOWLEDGE MEMORY",
  footerText,
  footerLinkText,
  footerLinkTo,
  theme,
}) {
  const activeTheme = theme || {
    background: "#080b16",
    primary: "#7c5cff",
  };

  return (
    <div
      className="recall-auth-page"
      style={{
        "--auth-background": activeTheme.background,
        "--auth-primary-color": activeTheme.primary,
      }}
    >
      {/* Decorative background */}
      <div className="auth-background-glow auth-glow-one"></div>
      <div className="auth-background-glow auth-glow-two"></div>
      <div className="auth-background-glow auth-glow-three"></div>

      <div className="auth-noise"></div>

      <main className="auth-container">
        <div className="auth-login-container">

          {/* Back to Recall */}
          <Link to="/" className="auth-back-link">
            <span className="auth-back-arrow">←</span>
            <span>Back to Recall</span>
          </Link>

          {/* Brand */}
          <Link to="/" className="auth-brand" aria-label="Back to Recall">
            <span className="auth-brand-mark">
              <span>R</span>
            </span>

            <span className="auth-brand-name">
              Recall
            </span>
          </Link>

          {/* Authentication card */}
          <section className="auth-form-container">

            <div className="auth-heading">
              <p className="auth-eyebrow">
                {eyebrow}
              </p>

              <h1>
                {title}
              </h1>

              {description && (
                <p className="auth-description">
                  {description}
                </p>
              )}
            </div>

            {children}

            {/* Bottom navigation supplied by page */}
            {(footerText || footerLinkText) && (
              <div className="auth-bottom-navigation">
                {footerText && (
                  <span>
                    {footerText}
                  </span>
                )}

                {footerLinkText && footerLinkTo && (
                  <Link to={footerLinkTo}>
                    {footerLinkText}
                  </Link>
                )}
              </div>
            )}

            {/* Guest access */}
            <div className="auth-guest-section">
              <div className="auth-divider">
                <span>or</span>
              </div>

              <Link
                to="/"
                className="auth-guest-button"
              >
                <span className="auth-guest-icon">↗</span>
                Continue as guest
              </Link>

              <p className="auth-guest-note">
                Explore Recall without creating an account.
              </p>
            </div>

          </section>

          {/* Privacy note */}
          <div className="auth-privacy-note">
            <span className="auth-lock-icon">🔒</span>

            <span>
              Your saved memories stay private.
            </span>
          </div>

          {/* Small footer */}
          <p className="auth-page-footer">
            Recall · Save it. Find it. Recall it.
          </p>

        </div>
      </main>
    </div>
  );
}

export default AuthLayout;