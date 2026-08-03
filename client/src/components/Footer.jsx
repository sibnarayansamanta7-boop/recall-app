function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="landing-footer">
      <div className="footer-container">
        <div>
          <a className="footer-logo" href="/">
            Recall
          </a>

          <p>Save knowledge today. Rediscover it tomorrow.</p>
        </div>

        <div className="footer-links">
          <a href="#features">Features</a>
          <a href="#about">About</a>
          <a
            href="https://github.com/sibnarayansamanta7-boop"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>

      <p className="footer-copyright">
        © {currentYear} Recall. Built by Sibnarayan Samanta.
      </p>
    </footer>
  );
}

export default Footer;