import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-badge">
          <span className="hero-badge-dot"></span>
          Your personal knowledge memory
        </div>

        <h1>
          Save what matters.
          <span> Find it when you need it.</span>
        </h1>

        <p className="hero-description">
          Recall helps you save useful links, personal notes and screenshots in
          one place. Later, search using the words you actually remember.
        </p>

        <div className="hero-actions">
          <Link className="primary-button" to="/register">
            Start remembering
            <span>→</span>
          </Link>

          <a className="secondary-button" href="#features">
            Explore features
          </a>
        </div>

        <p className="hero-note">
          No complicated folders. No perfect file names. Just save and search.
        </p>
      </div>

      <div className="hero-preview">
        <div className="preview-glow"></div>

        <div className="preview-window">
          <div className="preview-header">
            <div className="preview-window-controls">
              <span className="preview-dot"></span>
              <span className="preview-dot"></span>
              <span className="preview-dot"></span>
            </div>

            <span className="preview-title">Recall</span>

            <span className="preview-status">
              <span></span>
              Live
            </span>
          </div>

          <div className="preview-body">
            <p className="preview-label">
              What are you trying to remember?
            </p>

            <div className="preview-search">
              <span className="preview-search-icon">⌕</span>
              <span>the video explaining JWT refresh tokens</span>
            </div>

            <div className="preview-result">
              <div className="result-icon">▶</div>

              <div>
                <h3>Complete JWT Authentication Guide</h3>

                <p>
                  React, Node.js, access tokens, refresh tokens and protected
                  routes.
                </p>

                <div className="result-tags">
                  <span>React</span>
                  <span>JWT</span>
                  <span>Authentication</span>
                </div>
              </div>
            </div>

            <div className="preview-result">
              <div className="result-icon">📷</div>

              <div>
                <h3>Login error screenshot</h3>

                <p>
                  Screenshot saved while fixing an expired token problem.
                </p>

                <div className="result-tags">
                  <span>Debugging</span>
                  <span>Backend</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="floating-preview-card floating-preview-card-one">
          <span>🧠</span>
          <div>
            <strong>Context matters</strong>
            <small>Remember what you remember</small>
          </div>
        </div>

        <div className="floating-preview-card floating-preview-card-two">
          <span>🔐</span>
          <div>
            <strong>Secure sharing</strong>
            <small>Share with a simple code</small>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;