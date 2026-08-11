import { Link } from "react-router-dom";

const navigationItems = [
  {
    id: "home",
    icon: "⌂",
    label: "Home",
  },
  {
    id: "all",
    icon: "▦",
    label: "All items",
  },
  {
    id: "favourites",
    icon: "★",
    label: "Favourites",
  },
  {
    id: "links",
    icon: "↗",
    label: "Links",
  },
  {
    id: "notes",
    icon: "✎",
    label: "Notes",
  },
  {
    id: "screenshots",
    icon: "▣",
    label: "Screenshots",
  },
];

function DashboardSidebar({
  activeSection = "home",
  onSectionChange,
  isOpen = false,
  onClose,
}) {
  function handleNavigation(sectionId) {
    if (typeof onSectionChange === "function") {
      onSectionChange(sectionId);
    }

    if (typeof onClose === "function") {
      onClose();
    }
  }

  function handleClose() {
    if (typeof onClose === "function") {
      onClose();
    }
  }

  return (
    <>
      {/* Background overlay when sidebar is open */}
      {isOpen && (
        <button
          className="dashboard-sidebar-overlay"
          type="button"
          aria-label="Close navigation"
          onClick={handleClose}
        />
      )}

      <aside
        className={
          isOpen
            ? "dashboard-sidebar dashboard-sidebar-open"
            : "dashboard-sidebar"
        }
        aria-hidden={!isOpen}
      >
        {/* Sidebar header */}
        <div className="dashboard-sidebar-header">
          <Link
            className="dashboard-logo"
            to="/dashboard"
            onClick={handleClose}
          >
            <span className="dashboard-logo-icon">
              R
            </span>

            <span>Recall</span>
          </Link>

          <button
            className="dashboard-sidebar-close"
            type="button"
            aria-label="Close sidebar"
            onClick={handleClose}
          >
            ×
          </button>
        </div>

        {/* Sidebar content */}
        <div className="dashboard-sidebar-content">
          <p className="dashboard-menu-label">
            Workspace
          </p>

          <nav
            className="dashboard-navigation"
            aria-label="Dashboard navigation"
          >
            {navigationItems.map((item) => (
              <button
                key={item.id}
                className={
                  activeSection === item.id
                    ? "dashboard-nav-item dashboard-nav-item-active"
                    : "dashboard-nav-item"
                }
                type="button"
                onClick={() =>
                  handleNavigation(item.id)
                }
              >
                <span
                  className="dashboard-nav-icon"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>

                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Collections */}
          <div className="dashboard-collections">
            <div className="dashboard-collections-heading">
              <p className="dashboard-menu-label">
                Collections
              </p>

              <button
                type="button"
                aria-label="Create collection"
              >
                +
              </button>
            </div>

            <button
              className="dashboard-collection-item"
              type="button"
            >
              <span className="collection-dot collection-dot-purple" />
              Coding
            </button>

            <button
              className="dashboard-collection-item"
              type="button"
            >
              <span className="collection-dot collection-dot-blue" />
              Project ideas
            </button>

            <button
              className="dashboard-collection-item"
              type="button"
            >
              <span className="collection-dot collection-dot-green" />
              Learning
            </button>
          </div>
        </div>

        {/* Sidebar footer */}
        <div className="dashboard-sidebar-footer">
          <button
            className="dashboard-settings-button"
            type="button"
          >
            <span aria-hidden="true">
              ⚙
            </span>

            Settings
          </button>

          <Link
            className="dashboard-logout-button"
            to="/login"
            onClick={handleClose}
          >
            <span aria-hidden="true">
              ↪
            </span>

            Log out
          </Link>
        </div>
      </aside>
    </>
  );
}

export default DashboardSidebar;