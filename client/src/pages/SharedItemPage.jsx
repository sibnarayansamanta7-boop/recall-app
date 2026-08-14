import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchSharedItem } from "../services/itemApi";

function SharedItemPage() {
  const { shareCode } = useParams();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadItem() {
      try {
        setLoading(true);
        setError("");

        const data = await fetchSharedItem(shareCode);

        setItem(data.item);
      } catch (requestError) {
        setError(
          requestError.message ||
            "This shared item could not be found."
        );
      } finally {
        setLoading(false);
      }
    }

    if (shareCode) {
      loadItem();
    } else {
      setLoading(false);
      setError("No share code was provided.");
    }
  }, [shareCode]);

  if (loading) {
    return (
      <main className="shared-page">
        <div className="shared-loading">
          <div className="shared-loading-spinner"></div>
          <p>Finding your shared memory...</p>
        </div>
      </main>
    );
  }

  if (error || !item) {
    return (
      <main className="shared-page">
        <div className="shared-card shared-error-card">
          <Link className="shared-logo" to="/">
            <img src="/recall-logo.png" alt="Recall" />
            <span>Recall</span>
          </Link>

          <div className="shared-error-icon">!</div>

          <p className="shared-label">SHARED ITEM</p>

          <h1>We couldn't find this item.</h1>

          <p>
            The share code may be incorrect, expired, or no longer
            available.
          </p>

          <Link className="shared-home-button" to="/">
            Go to Recall
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="shared-page">
      <div className="shared-card">
        <Link className="shared-logo" to="/">
          <img src="/recall-logo.png" alt="Recall" />
          <span>Recall</span>
        </Link>

        <div className="shared-item-meta">
          <span className="shared-item-type">
            {item.type?.toUpperCase() || "ITEM"}
          </span>

          <span className="shared-item-code">
            {shareCode}
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
            className="shared-item-image"
          />
        )}

        {item.url && (
          <div className="shared-section">
            <p className="shared-section-label">SOURCE</p>

            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="shared-source-link"
            >
              Open original source ↗
            </a>
          </div>
        )}

        {item.source && (
          <div className="shared-section">
            <p className="shared-section-label">SAVED FROM</p>
            <p>{item.source}</p>
          </div>
        )}

        {item.tags?.length > 0 && (
          <div className="shared-section">
            <p className="shared-section-label">TAGS</p>

            <div className="shared-tags">
              {item.tags.map((tag) => (
                <span key={tag}>#{tag}</span>
              ))}
            </div>
          </div>
        )}

        {item.userNote && (
          <div className="shared-note">
            <p className="shared-section-label">NOTE</p>
            <p>{item.userNote}</p>
          </div>
        )}

        <div className="shared-footer">
          <span>🔐</span>
          Shared securely through Recall
        </div>
      </div>
    </main>
  );
}

export default SharedItemPage;