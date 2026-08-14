function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="landing-footer">
      <div className="footer-container">
        <div>
          <a href="/" className="footer-logo">
            <span className="footer-logo-mark">R</span>
            <span>Recall</span>
          </a>

          <p>
            Save it. Find it. Recall it.
          </p>
        </div>

        <div className="footer-links">
          <a href="/#features">Features</a>
          <a href="/#about">About</a>
          <a href="/login">Log in</a>
          <a href="/register">Get started</a>
        </div>
      </div>

      <div className="footer-copyright">
        © {currentYear} Recall. Built by Sibnarayan Samanta.
      </div>
    </footer>
  );
}

export default Footer;