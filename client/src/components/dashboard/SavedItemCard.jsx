function SavedItemCard({
  item,
  onToggleFavourite,
  onDelete,
  onEdit,
}) {
  const itemId = item._id || item.id;

  function handleFavourite() {
    if (typeof onToggleFavourite === "function") {
      onToggleFavourite(itemId);
    }
  }

  function handleDelete() {
    if (typeof onDelete === "function") {
      onDelete(itemId);
    }
  }

  function handleEdit() {
    if (typeof onEdit === "function") {
      onEdit(item);
    }
  }

  const itemTypeLabel =
    item.type === "link"
      ? "Link"
      : item.type === "note"
      ? "Note"
      : "Screenshot";

  return (
    <article className="saved-item-card">
      {item.type === "screenshot" &&
        item.thumbnail && (
          <div className="saved-item-thumbnail-wrapper">
            <img
              className="saved-item-thumbnail"
              src={item.thumbnail}
              alt={item.title}
            />

            <span className="saved-item-type saved-item-type-screenshot">
              ▣ {itemTypeLabel}
            </span>
          </div>
        )}

      {item.type === "note" && (
        <div className="saved-item-note-preview">
          <span className="saved-item-type saved-item-type-note">
            ✎ {itemTypeLabel}
          </span>

          <p>
            {item.description ||
              item.userNote ||
              "No note preview available."}
          </p>
        </div>
      )}

      {item.type === "link" && (
        <div className="saved-item-note-preview">
          <span className="saved-item-type">
            ↗ {itemTypeLabel}
          </span>

          <p>
            {item.description ||
              item.source ||
              "Saved website"}
          </p>
        </div>
      )}

      <div className="saved-item-content">
        <div className="saved-item-heading-row">
          <div>
            <p className="saved-item-source">
              {item.source || "Unknown source"}
            </p>

            <h3 title={item.title}>
              {item.title}
            </h3>
          </div>

          <button
            className={
              item.isFavourite
                ? "saved-item-favourite saved-item-favourite-active"
                : "saved-item-favourite"
            }
            type="button"
            onClick={handleFavourite}
            aria-label={
              item.isFavourite
                ? "Remove from favourites"
                : "Add to favourites"
            }
          >
            ★
          </button>
        </div>

        {item.description && (
          <p className="saved-item-description">
            {item.description}
          </p>
        )}

        {Array.isArray(item.tags) &&
          item.tags.length > 0 && (
            <div className="saved-item-tags">
              {item.tags.map((tag, index) => (
                <span key={`${tag}-${index}`}>
                  #{tag}
                </span>
              ))}
            </div>
          )}

        {item.userNote && (
          <div className="saved-item-note">
            <strong>Why did you save this?</strong>

            <p>{item.userNote}</p>
          </div>
        )}

        <div className="saved-item-footer">
          <span>
            {item.createdAt
              ? new Date(
                  item.createdAt
                ).toLocaleDateString("en-IN")
              : "Recently saved"}
          </span>

          <div className="saved-item-actions">
            <button
              className="saved-item-edit-button"
              type="button"
              onClick={handleEdit}
            >
              Edit
            </button>

            <button
              className="saved-item-delete-button"
              type="button"
              onClick={handleDelete}
            >
              Delete
            </button>

            {item.url && (
              <button
                className="saved-item-open-button"
                type="button"
                onClick={() =>
                  window.open(
                    item.url,
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              >
                Open
              </button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export default SavedItemCard;