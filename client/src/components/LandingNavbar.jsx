import { Link } from "react-router-dom";

function LandingNavbar() {
  return (
    <header className="landing-navbar">
      <div className="navbar-container">
        
      <Link className="landing-logo" to="/">
  <img
    src="/recall-logo.png"
    alt="Recall"
    className="landing-logo-image"
  />
  <span>Recall</span>
</Link>
        <nav
          className="landing-nav-links"
          aria-label="Main navigation"
        >
          <a href="#features">Features</a>
          <a href="#about">About</a>
        </nav>

        <div className="landing-nav-actions">
          <Link className="login-button" to="/login">
            Log in
          </Link>

          <Link className="register-button" to="/register">
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default LandingNavbar;
