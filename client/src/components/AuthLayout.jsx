import { useState } from "react";
import { Link } from "react-router-dom";
import themes from "../data/themes";
import "../styles/auth.css";

function AuthLayout({
  title,
  subtitle,
  children,
  bottomText,
  bottomLinkText,
  bottomLinkTo,
}) {
  const [selectedTheme, setSelectedTheme] = useState(themes[0]);

  const authPageStyle = {
    "--auth-background": selectedTheme.background,
    "--auth-color": selectedTheme.color,
    "--auth-primary-color": selectedTheme.primaryColor,
  };

  return (
    <main className="recall-auth-page" style={authPageStyle}>
      <section className="auth-container">
        <div className="auth-login-container">
          <div className="auth-circle auth-circle-one"></div>

          <div className="auth-form-container">
            <Link className="auth-back-link" to="/">
              ← Back to Recall
            </Link>

            <img
              src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png"
              alt="Person interacting with authentication form"
              className="auth-illustration"
            />

            <div className="auth-heading">
              <h1>{title}</h1>
              <p>{subtitle}</p>
            </div>

            {children}

            <div className="auth-bottom-navigation">
              <span>{bottomText}</span>

              <Link to={bottomLinkTo}>{bottomLinkText}</Link>
            </div>
          </div>

          <div className="auth-circle auth-circle-two"></div>
        </div>

        <div
          className="theme-btn-container"
          aria-label="Authentication page themes"
        >
          {themes.map((theme) => (
            <button
              key={theme.id}
              className={
                selectedTheme.id === theme.id
                  ? "theme-btn theme-btn-active"
                  : "theme-btn"
              }
              type="button"
              aria-label={`Use ${theme.name} theme`}
              title={theme.name}
              style={{
                background: theme.background,
              }}
              onClick={() => setSelectedTheme(theme)}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default AuthLayout;