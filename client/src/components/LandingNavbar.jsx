import { Link } from "react-router-dom";

function LandingNavbar() {
  return (
    <header className="landing-navbar">
      <div className="navbar-container">
        <Link
          to="/"
          className="landing-logo"
          aria-label="Recall home"
        >
          <span className="landing-logo-mark">
            <span>R</span>
          </span>

          <span className="landing-logo-text">
            Recall
          </span>
        </Link>

        <nav
          className="landing-nav-links"
          aria-label="Main navigation"
        >
          <a href="/#features">
            Features
          </a>

          <a href="/#about">
            About
          </a>
        </nav>

        <div className="landing-nav-actions">
          <Link
            to="/login"
            className="login-button"
          >
            Log in
          </Link>

          <Link
            to="/register"
            className="register-button"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default LandingNavbar;