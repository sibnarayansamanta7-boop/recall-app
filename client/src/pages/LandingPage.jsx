import { useState } from "react";
import LandingNavbar from "../components/LandingNavbar";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";
import { fetchSharedItem } from "../services/itemApi";
import "../styles/landing.css";

const features = [
  {
    id: 1,
    icon: "🔖",
    title: "Save everything useful",
    description:
      "Store website links, personal notes and screenshots without worrying about where to organize them.",
  },
  {
    id: 2,
    icon: "🔍",
    title: "Search naturally",
    description:
      "Search using the details you remember, even when you cannot remember the exact title or source.",
  },
  {
    id: 3,
    icon: "🧠",
    title: "Rediscover knowledge",
    description:
      "Return to valuable resources you saved weeks or months ago instead of forgetting them.",
  },
];

function LandingPage() {
  const [shareCode, setShareCode] = useState("");
  const [sharedItem, setSharedItem] = useState(null);
  const [shareError, setShareError] = useState("");
  const [shareLoading, setShareLoading] = useState(false);

  async function handleRecall() {
    const code = shareCode.trim();

    if (!code) {
      setShareError("Please enter a share code.");
      return;
    }

    try {
      setShareLoading(true);
      setShareError("");
      setSharedItem(null);

      const data = await fetchSharedItem(code);

      setSharedItem(data.item);
    } catch (error) {
      setShareError(
        error.message || "Share code not found."
      );
    } finally {
      setShareLoading(false);
    }
  }

  return (
    <div className="landing-page">
      <LandingNavbar />

      <main>
        <Hero />

        {/* SHARE CODE SECTION */}
        <section className="recall-code-section">
          <div className="recall-code-card">
            <div className="recall-code-icon">
              🔐
            </div>

            <p className="recall-code-label">
              HAVE A SHARE CODE?
            </p>

            <h2>
              Recall something instantly
            </h2>

            <p>
              Enter the short share code and retrieve
              the saved item without logging in.
            </p>

            <div className="recall-code-form">
              <input
                type="text"
                value={shareCode}
                onChange={(event) =>
                  setShareCode(event.target.value)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleRecall();
                  }
                }}
                placeholder="Enter share code"
                maxLength={12}
              />

              <button
                type="button"
                onClick={handleRecall}
                disabled={shareLoading}
              >
                {shareLoading
                  ? "Finding..."
                  : "Recall"}
              </button>
            </div>

            {shareError && (
              <p className="recall-code-error">
                {shareError}
              </p>
            )}

            {sharedItem && (
              <div className="recall-result-card">
                <div className="recall-result-top">
                  <span>
                    {sharedItem.type}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setSharedItem(null)
                    }
                    aria-label="Close result"
                  >
                    ×
                  </button>
                </div>

                <h3>
                  {sharedItem.title}
                </h3>
                {sharedItem.thumbnail && (
  <img
    src={sharedItem.thumbnail}
    alt={sharedItem.title}
    className="recall-result-image"
  />
)}

                {sharedItem.description && (
                  <p>
                    {sharedItem.description}
                  </p>
                )}

                {sharedItem.url && (
                  <a
                    href={sharedItem.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Open source ↗
                  </a>
                )}

                {sharedItem.tags?.length > 0 && (
                  <div className="recall-result-tags">
                    {sharedItem.tags.map((tag) => (
                      <span key={tag}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* FEATURES */}
        <section
          className="features-section"
          id="features"
        >
          <div className="section-heading">
            <p className="section-label">
              Built for human memory
            </p>

            <h2>
              Finding something again should not be
              difficult.
            </h2>

            <p>
              Recall captures enough context when you
              save something, so your future self can
              find it with incomplete memories.
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

        {/* ABOUT */}
        <section
          className="about-section"
          id="about"
        >
          <div className="about-content">
            <p className="section-label">
              Why Recall?
            </p>

            <h2>
              Your bookmarks remember titles. You
              remember context.
            </h2>

            <p>
              You may forget a page name, but remember
              that it had a dark design, explained
              MongoDB authentication or was useful for
              your React login project. Recall is
              designed around those imperfect memories.
            </p>

            <button
              className="primary-button"
              type="button"
            >
              Create your memory space
            </button>
          </div>

          <div className="memory-example">
            <p className="memory-example-title">
              You remember:
            </p>

            <blockquote>
              “That Indian coding video about protecting
              Express routes.”
            </blockquote>

            <div className="memory-arrow">
              ↓
            </div>

            <div className="memory-answer">
              <strong>Recall finds:</strong>

              <span>
                JWT Authentication with Express
                Middleware
              </span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default LandingPage;