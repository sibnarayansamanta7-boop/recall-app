function ItemTypeSelector({
  selectedType = "link",
  onTypeChange,
}) {
  const itemTypes = [
    {
      id: "link",
      icon: "↗",
      label: "Link",
      description: "Save a website",
    },
    {
      id: "note",
      icon: "✎",
      label: "Note",
      description: "Save personal knowledge",
    },
    {
      id: "screenshot",
      icon: "▣",
      label: "Screenshot",
      description: "Save an image",
    },
  ];

  function handleTypeChange(type) {
    if (typeof onTypeChange === "function") {
      onTypeChange(type);
    }
  }

  return (
    <div className="item-type-selector">
      <div className="item-type-selector-label">
        What do you want to save?
      </div>

      <div className="item-type-options">
        {itemTypes.map((itemType) => (
          <button
            key={itemType.id}
            type="button"
            className={`item-type-option ${
              selectedType === itemType.id
                ? "item-type-option-active"
                : ""
            }`}
            onClick={() =>
              handleTypeChange(itemType.id)
            }
          >
            <span className="item-type-icon">
              {itemType.icon}
            </span>

            <span className="item-type-content">
              <strong>{itemType.label}</strong>

              <small>
                {itemType.description}
              </small>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ItemTypeSelector;