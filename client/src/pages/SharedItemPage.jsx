import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchSharedItem } from "../services/itemApi";
import "../styles/shared.css";

function SharedItemPage() {
  const { shareCode } = useParams();

  const [item, setItem] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    let cancelled = false;

    async function loadSharedItem() {
      if (!shareCode) {
        setError(
          "No share code was provided."
        );
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const data =
          await fetchSharedItem(
            shareCode
          );

        if (!cancelled) {
          setItem(data?.item || null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err?.message ||
              "This shared item could not be found."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadSharedItem();

    return () => {
      cancelled = true;
    };
  }, [shareCode]);

  if (loading) {
    return (
      <div className="shared-page">
        <div className="shared-loading">
          <div className="shared-loading-spinner"></div>
          <p>Finding your memory...</p>
        </div>
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="shared-page">
        <div className="shared-error-card">
          <div className="shared-brand">
            <img
              src="/recall-avatar.png"
              alt="Recall"
            />
            <span>Recall</span>
          </div>

          <div className="shared-error-icon">
            !
          </div>

          <h1>
            Memory not found
          </h1>

          <p>
            {error ||
              "This shared item may have expired or been removed."}
          </p>

          <Link
            to="/"
            className="shared-primary-button"
          >
            Go to Recall
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="shared-page">
      <header className="shared-header">
        <Link
          to="/"
          className="shared-brand"
        >
          <img
            src="/recall-avatar.png"
            alt="Recall"
          />

          <span>Recall</span>
        </Link>

        <Link
          to="/"
          className="shared-home-link"
        >
          Open Recall →
        </Link>
      </header>

      <main className="shared-main">
        <article className="shared-card">
          <div className="shared-card-top">
            <span className="shared-label">
              SHARED ITEM
            </span>

            <span className="shared-type">
              {item.type?.toUpperCase() ||
                "MEMORY"}
            </span>
          </div>

          <h1>{item.title}</h1>

          {item.description && (
            <p className="shared-description">
              {item.description}
            </p>
          )}

          {item.thumbnail && (
            <img
              src={item.thumbnail}
              alt={item.title}
              className="shared-image"
            />
          )}

          {item.url && (
            <div className="shared-section">
              <h2>Source</h2>

              <a
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="shared-source-link"
              >
                Open source ↗
              </a>
            </div>
          )}

          {item.source && (
            <div className="shared-section">
              <h2>Saved from</h2>
              <p>{item.source}</p>
            </div>
          )}

          {item.tags?.length > 0 && (
            <div className="shared-section">
              <h2>Tags</h2>

              <div className="shared-tags">
                {item.tags.map((tag) => (
                  <span key={tag}>
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {item.userNote && (
            <div className="shared-note">
              <span className="shared-note-icon">
                ✦
              </span>

              <div>
                <h2>Your note</h2>
                <p>{item.userNote}</p>
              </div>
            </div>
          )}

          <div className="shared-footer">
            <span>
              🔐 Shared securely through Recall
            </span>
          </div>
        </article>
      </main>
    </div>
  );
}

export default SharedItemPage;