function SavedItemCard({
  item,
  onToggleFavourite,
  onDelete,
}) {
  const safeItem = item || {};

  const itemId =
    safeItem._id ||
    safeItem.id ||
    "";

  const dateValue =
    safeItem.createdAt ||
    safeItem.savedAt;

  const parsedDate =
    dateValue
      ? new Date(dateValue)
      : null;

  const formattedDate =
    parsedDate &&
    !Number.isNaN(
      parsedDate.getTime()
    )
      ? new Intl.DateTimeFormat(
          "en-IN",
          {
            day: "numeric",
            month: "short",
            year: "numeric",
          }
        ).format(parsedDate)
      : "Recently";

  const safeTags =
    Array.isArray(
      safeItem.tags
    )
      ? safeItem.tags.filter(
          (tag) =>
            typeof tag ===
              "string" &&
            tag.trim().length > 0
        )
      : [];

  const safeTitle =
    typeof safeItem.title ===
      "string" &&
    safeItem.title.trim()
      ? safeItem.title.trim()
      : "Untitled item";

  const safeDescription =
    typeof safeItem.description ===
      "string" &&
    safeItem.description.trim()
      ? safeItem.description.trim()
      : "No description available.";

  const safeSource =
    typeof safeItem.source ===
      "string" &&
    safeItem.source.trim()
      ? safeItem.source.trim()
      : "Unknown source";

  const safeUserNote =
    typeof safeItem.userNote ===
      "string" &&
    safeItem.userNote.trim()
      ? safeItem.userNote.trim()
      : "No personal note added.";

  const safeType = [
    "link",
    "note",
    "screenshot",
  ].includes(safeItem.type)
    ? safeItem.type
    : "note";

  const safeThumbnail =
    typeof safeItem.thumbnail ===
      "string"
      ? safeItem.thumbnail
      : "";

  const safeUrl =
    typeof safeItem.url ===
      "string"
      ? safeItem.url
      : "";

  function getTypeLabel(type) {
    if (type === "link") {
      return "Link";
    }

    if (
      type === "screenshot"
    ) {
      return "Screenshot";
    }

    return "Note";
  }

  function getTypeIcon(type) {
    if (type === "link") {
      return "↗";
    }

    if (
      type === "screenshot"
    ) {
      return "▣";
    }

    return "✎";
  }

  function handleOpenItem() {
    if (
      safeType === "link" &&
      safeUrl
    ) {
      window.open(
        safeUrl,
        "_blank",
        "noopener,noreferrer"
      );

      return;
    }

    alert(
      `Opening "${safeTitle}" will be added later.`
    );
  }

  function handleFavouriteClick() {
    if (
      !itemId ||
      typeof onToggleFavourite !==
        "function"
    ) {
      return;
    }

    onToggleFavourite(itemId);
  }

  function handleDeleteClick() {
    if (
      !itemId ||
      typeof onDelete !==
        "function"
    ) {
      return;
    }

    onDelete(itemId);
  }

  return (
    <article className="saved-item-card">
      {safeThumbnail ? (
        <div className="saved-item-thumbnail-wrapper">
          <img
            src={
              safeThumbnail
            }
            alt={safeTitle}
            className="saved-item-thumbnail"
          />

          <span
            className={`saved-item-type saved-item-type-${safeType}`}
          >
            {getTypeIcon(
              safeType
            )}{" "}
            {getTypeLabel(
              safeType
            )}
          </span>
        </div>
      ) : (
        <div className="saved-item-note-preview">
          <span
            className={`saved-item-type saved-item-type-${safeType}`}
          >
            {getTypeIcon(
              safeType
            )}{" "}
            {getTypeLabel(
              safeType
            )}
          </span>

          <p>
            {safeDescription}
          </p>
        </div>
      )}

      <div className="saved-item-content">
        <div className="saved-item-heading-row">
          <div>
            <p className="saved-item-source">
              {safeSource}
            </p>

            <h3>
              {safeTitle}
            </h3>
          </div>

          <button
            className={
              safeItem.isFavourite
                ? "saved-item-favourite saved-item-favourite-active"
                : "saved-item-favourite"
            }
            type="button"
            aria-label={
              safeItem.isFavourite
                ? "Remove from favourites"
                : "Add to favourites"
            }
            onClick={
              handleFavouriteClick
            }
          >
            {safeItem.isFavourite
              ? "★"
              : "☆"}
          </button>
        </div>

        {safeThumbnail && (
          <p className="saved-item-description">
            {safeDescription}
          </p>
        )}

        <div className="saved-item-tags">
          {safeTags.length >
          0 ? (
            safeTags.map(
              (tag, index) => (
                <span
                  key={`${tag}-${index}`}
                >
                  {tag}
                </span>
              )
            )
          ) : (
            <span>
              No tags
            </span>
          )}
        </div>

        <div className="saved-item-note">
          <strong>
            Why I saved this
          </strong>

          <p>
            {safeUserNote}
          </p>
        </div>

        <div className="saved-item-footer">
          <span>
            Saved{" "}
            {formattedDate}
          </span>

          <div className="saved-item-actions">
            <button
              className="saved-item-delete-button"
              type="button"
              onClick={
                handleDeleteClick
              }
            >
              Delete
            </button>

            <button
              className="saved-item-open-button"
              type="button"
              onClick={
                handleOpenItem
              }
            >
              Open
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default SavedItemCard;