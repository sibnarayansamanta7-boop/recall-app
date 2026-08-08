function EmptyState({
  searchQuery = "",
  onClearFilters,
  onAddItem,
}) {
  const safeSearchQuery =
    typeof searchQuery === "string" ? searchQuery : "";

  const hasSearch = safeSearchQuery.trim().length > 0;

  function handleClearFilters() {
    if (typeof onClearFilters === "function") {
      onClearFilters();
    }
  }

  function handleAddItem() {
    if (typeof onAddItem === "function") {
      onAddItem();
    }
  }

  return (
    <div className="dashboard-empty-state">
      <div
        className="dashboard-empty-icon"
        aria-hidden="true"
      >
        {hasSearch ? "⌕" : "＋"}
      </div>

      <h3>
        {hasSearch
          ? "No saved item matches your search"
          : "Nothing is saved here yet"}
      </h3>

      <p>
        {hasSearch
          ? `We could not find anything matching "${safeSearchQuery}". Try different words or clear your filters.`
          : "Save your first link, note or screenshot to start building your searchable memory."}
      </p>

      <div className="dashboard-empty-actions">
        {hasSearch && (
          <button
            className="dashboard-secondary-action"
            type="button"
            onClick={handleClearFilters}
          >
            Clear search
          </button>
        )}

        <button
          className="dashboard-primary-action"
          type="button"
          onClick={handleAddItem}
        >
          {hasSearch ? "Add new item" : "Add your first item"}
        </button>
      </div>
    </div>
  );
}

export default EmptyState;