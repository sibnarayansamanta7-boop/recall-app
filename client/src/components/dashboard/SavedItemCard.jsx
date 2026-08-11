function SavedItemCard({
  item,
  onToggleFavourite,
  onDelete,
  onEdit,
  onShare,
}) {
  const id = item?._id || item?.id;

  const title = item?.title || "Untitled";

  const content =
    item?.content ||
    item?.description ||
    item?.text ||
    "";

  const type =
    item?.type ||
    item?.itemType ||
    "note";

  const favourite =
    item?.isFavourite ||
    item?.favourite ||
    false;

  const date = item?.createdAt
    ? new Date(item.createdAt).toLocaleDateString()
    : "";

  return (
    <article className="saved-item-card">

      <div className="saved-item-top">
        <span className="saved-item-type">
          {type === "link" ? "↗ Link" : "✎ Note"}
        </span>

        <button
          type="button"
          className={
            favourite
              ? "favourite-button active"
              : "favourite-button"
          }
          onClick={() => onToggleFavourite(id)}
        >
          ★
        </button>
      </div>

      <div className="saved-item-body">
        <h3>{title}</h3>

        {content && <p>{content}</p>}
      </div>

      <div className="saved-item-footer">
        <span>{date}</span>

        <div className="saved-item-actions">

          <button
            type="button"
            onClick={() => onEdit(item)}
          >
            Edit
          </button>

          <button
            type="button"
            onClick={() => onShare(item)}
          >
            Share
          </button>

          <button
            type="button"
            className="delete-button"
            onClick={() => onDelete(id)}
          >
            Delete
          </button>

        </div>
      </div>

    </article>
  );
}

export default SavedItemCard;