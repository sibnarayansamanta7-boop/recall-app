import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSharedItem } from "../services/itemApi";

function SharedItemPage() {
  const { shareCode } = useParams();

  const [item, setItem] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadItem() {
      try {
        setIsLoading(true);
        setError("");

        const data = await fetchSharedItem(shareCode);
        setItem(data.item);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadItem();
  }, [shareCode]);

  if (isLoading) {
    return (
      <main className="shared-page">
        <div className="shared-card">
          <div className="shared-logo">Recall</div>
          <p className="shared-message">Loading shared item...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="shared-page">
        <div className="shared-card">
          <div className="shared-logo">Recall</div>

          <p className="shared-label">SHARED KNOWLEDGE</p>

          <h1>Shared item unavailable</h1>

          <p className="shared-message">{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="shared-page">
      <article className="shared-card">
        <div className="shared-logo">Recall</div>

        <p className="shared-label">SHARED KNOWLEDGE</p>

        <div className="shared-header">
          <div>
            <h1>{item.title}</h1>

            <span className="shared-type">
              {item.type}
            </span>
          </div>
        </div>

        {item.description && (
          <section className="shared-section">
            <h2>Description</h2>
            <p>{item.description}</p>
          </section>
        )}

        {item.url && (
          <section className="shared-section">
            <h2>Source</h2>

            <a
              href={item.url}
              target="_blank"
              rel="noreferrer"
              className="shared-link"
            >
              Open source
            </a>
          </section>
        )}

        {item.source && (
          <section className="shared-section">
            <h2>Saved from</h2>
            <p>{item.source}</p>
          </section>
        )}

        {item.tags?.length > 0 && (
          <section className="shared-section">
            <h2>Tags</h2>

            <div className="shared-tags">
              {item.tags.map((tag) => (
                <span key={tag}>
                  #{tag}
                </span>
              ))}
            </div>
          </section>
        )}

        {item.userNote && (
          <section className="shared-section">
            <h2>Personal note</h2>
            <p>{item.userNote}</p>
          </section>
        )}

        <footer className="shared-footer">
          Shared securely through Recall
        </footer>
      </article>
    </main>
  );
}

export default SharedItemPage;