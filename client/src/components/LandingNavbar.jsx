function LandingNavbar() {
    return (
        <header className="landing-navbar">
            <div className="navbar-container">
                <a className="landing-logo" href="/">
                    Recall
                </a>

                <nav className="landing-nav-links" aria-label="Main navigation">
                    <a href="#features">Features</a>
                    <a href="#about">About</a>
                </nav>

                <div className="landing-nav-actions">
                    <button className="login-button" type="button">
                        Login
                    </button>

                    <button className="register-button" type="button">
                        Get started
                    </button>
                </div>
            </div>
        </header>
    );
}

export default LandingNavbar;