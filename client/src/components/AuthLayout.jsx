import { useState } from "react";
import { Link } from "react-router-dom";

function AuthLayout({
  title,
  subtitle,
  children,
  bottomText,
  bottomLinkText,
  bottomLinkTo,
}) {
  const [theme, setTheme] = useState("dark");

  const themes = {
    dark: {
      background: "#111827",
      primary: "#7c5cff",
    },
    purple: {
      background: "#24124d",
      primary: "#a855f7",
    },
    blue: {
      background: "#0b2447",
      primary: "#3b82f6",
    },
    green: {
      background: "#092b24",
      primary: "#10b981",
    },
  };

  const activeTheme = themes[theme];

  return (
    <div
      className="recall-auth-page"
      style={{
        "--auth-background": activeTheme.background,
        "--auth-primary-color": activeTheme.primary,
      }}
    >
      <div className="auth-container">
        <div className="auth-login-container">
          <Link to="/" className="auth-back-link">
            ← Back to Recall
          </Link>

          <div className="auth-brand">
            <img src="/recall-logo.png" alt="Recall" />
            <span>Recall</span>
          </div>

          <div className="auth-form-container">
            <div className="auth-heading">
              <p className="auth-eyebrow">WELCOME BACK</p>

              <h1>{title}</h1>

              <p>{subtitle}</p>
            </div>

            {children}
          </div>

          {bottomText && bottomLinkText && bottomLinkTo && (
            <div className="auth-bottom-navigation">
              <span>{bottomText}</span>

              <Link to={bottomLinkTo}>{bottomLinkText}</Link>
            </div>
          )}
        </div>

        <div className="auth-decoration auth-decoration-one"></div>
        <div className="auth-decoration auth-decoration-two"></div>
        <div className="auth-decoration auth-decoration-three"></div>

        <div className="theme-btn-container">
          {Object.entries(themes).map(([themeName, themeValue]) => (
            <button
              key={themeName}
              type="button"
              className={`theme-btn ${
                theme === themeName ? "theme-btn-active" : ""
              }`}
              style={{ background: themeValue.primary }}
              onClick={() => setTheme(themeName)}
              aria-label={`Use ${themeName} theme`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;