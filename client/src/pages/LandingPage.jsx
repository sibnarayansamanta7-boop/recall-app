import LandingNavbar from "../components/LandingNavbar";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";
import "../styles/landing.css";

const features = [
  {
    id: 1,
    icon: "🔖",
    title: "Save everything useful",
    description:
      "Store website links, personal notes and screenshots without worrying about where to organize them."
  },
  {
    id: 2,
    icon: "🔍",
    title: "Search naturally",
    description:
      "Search using the details you remember, even when you cannot remember the exact title or source."
  },
  {
    id: 3,
    icon: "🧠",
    title: "Rediscover knowledge",
    description:
      "Return to valuable resources you saved weeks or months ago instead of forgetting them."
  }
];

function LandingPage() {
  return (
    <div className="landing-page">
      <LandingNavbar />

      <main>
        <Hero />

        <section className="features-section" id="features">
          <div className="section-heading">
            <p className="section-label">Built for human memory</p>

            <h2>Finding something again should not be difficult.</h2>

            <p>
              Recall captures enough context when you save something, so your
              future self can find it with incomplete memories.
            </p>
          </div>

          <div className="features-grid">
            {features.map((feature) => (
              <FeatureCard
                key={feature.id}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="about-content">
            <p className="section-label">Why Recall?</p>

            <h2>Your bookmarks remember titles. You remember context.</h2>

            <p>
              You may forget a page name, but remember that it had a dark
              design, explained MongoDB authentication or was useful for your
              React login project. Recall is designed around those imperfect
              memories.
            </p>

            <button className="primary-button" type="button">
              Create your memory space
            </button>
          </div>

          <div className="memory-example">
            <p className="memory-example-title">You remember:</p>

            <blockquote>
              “That Indian coding video about protecting Express routes.”
            </blockquote>

            <div className="memory-arrow">↓</div>

            <div className="memory-answer">
              <strong>Recall finds:</strong>
              <span>JWT Authentication with Express Middleware</span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default LandingPage;