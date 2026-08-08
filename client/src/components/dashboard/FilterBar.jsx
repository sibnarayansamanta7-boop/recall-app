const filters = [
  {
    id: "all",
    label: "All",
  },
  {
    id: "link",
    label: "Links",
  },
  {
    id: "note",
    label: "Notes",
  },
  {
    id: "screenshot",
    label: "Screenshots",
  },
  {
    id: "favourite",
    label: "Favourites",
  },
];

function FilterBar({
  activeFilter = "all",
  onFilterChange,
  sortOrder = "newest",
  onSortChange,
  resultCount = 0,
}) {
  function handleFilterChange(filterId) {
    if (typeof onFilterChange === "function") {
      onFilterChange(filterId);
    }
  }

  function handleSortChange(event) {
    if (typeof onSortChange === "function") {
      onSortChange(event.target.value);
    }
  }

  return (
    <div className="dashboard-filter-bar">
      <div className="dashboard-filter-heading">
        <div>
          <h2>Your saved knowledge</h2>

          <p>
            {resultCount}{" "}
            {resultCount === 1 ? "item" : "items"} found
          </p>
        </div>
      </div>

      <div className="dashboard-filter-controls">
        <div className="dashboard-filter-buttons">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={
                activeFilter === filter.id
                  ? "dashboard-filter-button dashboard-filter-button-active"
                  : "dashboard-filter-button"
              }
              type="button"
              onClick={() =>
                handleFilterChange(filter.id)
              }
            >
              {filter.label}
            </button>
          ))}
        </div>

        <select
          className="dashboard-sort-select"
          value={sortOrder}
          onChange={handleSortChange}
          aria-label="Sort saved items"
        >
          <option value="newest">
            Newest first
          </option>

          <option value="oldest">
            Oldest first
          </option>

          <option value="title">
            Title A–Z
          </option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;