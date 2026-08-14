import { Link } from "react-router-dom";

function LandingNavbar() {
  return (
    <header className="landing-navbar">
      <div className="navbar-container">
        <Link className="landing-logo" to="/">
          <img src="/recall-logo.png" alt="Recall" />
          <span>Recall</span>
        </Link>

        <nav className="landing-nav-links">
          <a href="/#features">Features</a>
          <a href="/#about">About</a>
        </nav>

        <div className="landing-nav-actions">
          <Link className="login-button" to="/login">
            Login
          </Link>

          <Link className="register-button" to="/register">
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default LandingNavbar;