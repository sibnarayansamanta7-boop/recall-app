import { useState } from "react";
import LandingNavbar from "../components/LandingNavbar";
import Hero from "../components/Hero";
import FeatureCard from "../components/FeatureCard";
import Footer from "../components/Footer";
import "../styles/landing.css";
import { fetchSharedItem } from "../services/itemApi";

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
  const [shareLoading, setShareLoading] = useState(false);
  const [shareError, setShareError] = useState("");
  const [sharedItem, setSharedItem] = useState(null);

  const [showItemModal, setShowItemModal] = useState(false);

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
      setShowItemModal(false);

      const data = await fetchSharedItem(code);

      setSharedItem(data.item);
    } catch (error) {
      setShareError(
        error.message || "Unable to find this shared item."
      );
    } finally {
      setShareLoading(false);
    }
  }

  function openItemModal() {
    if (sharedItem) {
      setShowItemModal(true);
    }
  }

  function closeItemModal() {
    setShowItemModal(false);
  }

  return (
    <div className="landing-page">
      <LandingNavbar />

      <main>
        <Hero />

        {/* SHARE CODE SECTION */}
        <section className="recall-code-section">
          <div className="recall-code-card">
            <div className="recall-code-icon">🔐</div>

            <p className="recall-code-label">
              HAVE A SHARE CODE?
            </p>

            <h2>Recall something instantly</h2>

            <p>
              Enter the short share code and retrieve the
              saved item without logging in.
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
                maxLength={20}
              />

              <button
                type="button"
                onClick={handleRecall}
                disabled={shareLoading}
              >
                {shareLoading ? "Finding..." : "Recall"}
              </button>
            </div>

            {shareError && (
              <p className="recall-code-error">
                {shareError}
              </p>
            )}

            {/* CLICKABLE RESULT */}
            {sharedItem && (
              <button
                type="button"
                className="recall-result-card"
                onClick={openItemModal}
              >
                <div className="recall-result-top">
                  <span>
                    {sharedItem.type?.toUpperCase()}
                  </span>

                  <span className="recall-result-open">
                    View →
                  </span>
                </div>

                <h3>{sharedItem.title}</h3>

                {sharedItem.description && (
                  <p>{sharedItem.description}</p>
                )}

                {sharedItem.thumbnail && (
                  <img
                    src={sharedItem.thumbnail}
                    alt={sharedItem.title}
                    className="recall-result-image"
                  />
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

                <div className="recall-result-hint">
                  Click to view full item
                </div>
              </button>
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
              Finding something again should not be difficult.
            </h2>

            <p>
              Recall captures enough context when you save
              something, so your future self can find it with
              incomplete memories.
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
              Your bookmarks remember titles. You remember
              context.
            </h2>

            <p>
              You may forget a page name, but remember that it
              had a dark design, explained MongoDB
              authentication or was useful for your React login
              project. Recall is designed around those imperfect
              memories.
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

            <div className="memory-arrow">↓</div>

            <div className="memory-answer">
              <strong>Recall finds:</strong>
              <span>
                JWT Authentication with Express Middleware
              </span>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* FULL ITEM POPUP */}
      {showItemModal && sharedItem && (
        <div
          className="recall-item-modal-overlay"
          onClick={closeItemModal}
        >
          <div
            className="recall-item-modal"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              type="button"
              className="recall-item-modal-close"
              onClick={closeItemModal}
              aria-label="Close"
            >
              ×
            </button>

            <p className="recall-item-modal-label">
              SHARED ITEM
            </p>

            <div className="recall-item-modal-type">
              {sharedItem.type?.toUpperCase()}
            </div>

            <h2>{sharedItem.title}</h2>

            {sharedItem.thumbnail && (
              <img
                src={sharedItem.thumbnail}
                alt={sharedItem.title}
                className="recall-modal-image"
              />
            )}

            {sharedItem.description && (
              <div className="recall-modal-section">
                <h3>Description</h3>
                <p>{sharedItem.description}</p>
              </div>
            )}

            {sharedItem.url && (
              <div className="recall-modal-section">
                <h3>Source</h3>

                <a
                  href={sharedItem.url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open source ↗
                </a>
              </div>
            )}

            {sharedItem.source && (
              <div className="recall-modal-section">
                <h3>Saved from</h3>
                <p>{sharedItem.source}</p>
              </div>
            )}

            {sharedItem.tags?.length > 0 && (
              <div className="recall-modal-section">
                <h3>Tags</h3>

                <div className="recall-modal-tags">
                  {sharedItem.tags.map((tag) => (
                    <span key={tag}>
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {sharedItem.userNote && (
              <div className="recall-modal-section">
                <h3>Note</h3>
                <p>{sharedItem.userNote}</p>
              </div>
            )}

            <div className="recall-modal-footer">
              Shared securely through Recall
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;