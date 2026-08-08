const itemTypes = [
  {
    id: "link",
    icon: "↗",
    title: "Link",
    description: "Save a webpage, video or article",
  },
  {
    id: "note",
    icon: "✎",
    title: "Note",
    description: "Save your own idea or learning",
  },
  {
    id: "screenshot",
    icon: "▣",
    title: "Screenshot",
    description: "Save an image for future search",
  },
];

function ItemTypeSelector({
  selectedType = "link",
  onTypeChange,
}) {
  function handleTypeChange(typeId) {
    if (typeof onTypeChange === "function") {
      onTypeChange(typeId);
    }
  }

  return (
    <div className="item-type-selector">
      {itemTypes.map((type) => (
        <button
          key={type.id}
          className={
            selectedType === type.id
              ? "item-type-button item-type-button-active"
              : "item-type-button"
          }
          type="button"
          onClick={() => handleTypeChange(type.id)}
        >
          <span
            className="item-type-icon"
            aria-hidden="true"
          >
            {type.icon}
          </span>

          <span className="item-type-text">
            <strong>{type.title}</strong>
            <small>{type.description}</small>
          </span>
        </button>
      ))}
    </div>
  );
}

export default ItemTypeSelector;