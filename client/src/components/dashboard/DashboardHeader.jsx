function DashboardHeader({
  searchQuery = "",
  onSearchChange,
  onMenuClick,
  onAddItem,
  currentUser = {},
}) {
  function handleSearchChange(event) {
    if (typeof onSearchChange === "function") {
      onSearchChange(event.target.value);
    }
  }

  function handleMenuClick() {
    if (typeof onMenuClick === "function") {
      onMenuClick();
    }
  }

  function handleAddItemClick() {
    if (typeof onAddItem === "function") {
      onAddItem();
    }
  }

  const userName = currentUser?.name?.trim() || "User";

  const userInitials = userName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

  return (
    <header className="dashboard-header">
      <button
        className="dashboard-menu-button"
        type="button"
        onClick={handleMenuClick}
        aria-label="Open menu"
      >
        ☰
      </button>

      <div className="dashboard-search-wrapper">
        <span
          className="dashboard-search-icon"
          aria-hidden="true"
        >
          ⌕
        </span>

        <input
          type="search"
          placeholder="Search your saved memory..."
          value={searchQuery}
          onChange={handleSearchChange}
          aria-label="Search saved items"
        />

        <kbd>⌘ K</kbd>
      </div>

      <div className="dashboard-header-actions">
        <button
          className="dashboard-add-button"
          type="button"
          onClick={handleAddItemClick}
        >
          <span aria-hidden="true">+</span>
          Add item
        </button>

        <button
          className="dashboard-notification-button"
          type="button"
          aria-label="Notifications"
        >
          <span aria-hidden="true">♢</span>
          <span className="notification-dot" />
        </button>

        <button
          className="dashboard-profile"
          type="button"
          aria-label={`Profile of ${userName}`}
        >
          <span className="dashboard-avatar">
            {userInitials || "U"}
          </span>

          <span className="dashboard-profile-text">
            <strong>{userName}</strong>
            <small>Free account</small>
          </span>

          <span
            className="dashboard-profile-arrow"
            aria-hidden="true"
          >
            ⌄
          </span>
        </button>
      </div>
    </header>
  );
}

export default DashboardHeader;