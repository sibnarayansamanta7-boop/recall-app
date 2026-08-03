function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <p className="hero-badge">Your personal knowledge memory</p>

        <h1>
          Save what matters.
          <span> Find it when you need it.</span>
        </h1>

        <p className="hero-description">
          Recall helps you save useful links, personal notes and screenshots in
          one place. Later, search using the words you actually remember.
        </p>

        <div className="hero-actions">
          <button className="primary-button" type="button">
            Start remembering
          </button>

          <a className="secondary-button" href="#features">
            Explore features
          </a>
        </div>

        <p className="hero-note">
          No complicated folders. No perfect file names. Just save and search.
        </p>
      </div>

      <div className="hero-preview">
        <div className="preview-window">
          <div className="preview-header">
            <span className="preview-dot"></span>
            <span className="preview-dot"></span>
            <span className="preview-dot"></span>
          </div>

          <div className="preview-body">
            <p className="preview-label">What are you trying to remember?</p>

            <div className="preview-search">
              the video explaining JWT refresh tokens
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
      </div>
    </section>
  );
}

export default Hero;