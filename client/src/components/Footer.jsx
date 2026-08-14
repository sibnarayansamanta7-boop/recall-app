function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="landing-footer">
      <div className="footer-container">
        <div>
          <a className="footer-logo" href="/">
            <img src="/recall-logo.png" alt="Recall" />
            <span>Recall</span>
          </a>

          <p>
            Save it. Find it. Recall it.
          </p>
        </div>

        <div className="footer-links">
          <a href="/#features">Features</a>
          <a href="/#about">About</a>
          <a href="/login">Login</a>
          <a href="/register">Get Started</a>
        </div>
      </div>

      <div className="footer-copyright">
        © {currentYear} Recall. Built by Sibnarayan Samanta.
      </div>
    </footer>
  );
}

export default Footer;