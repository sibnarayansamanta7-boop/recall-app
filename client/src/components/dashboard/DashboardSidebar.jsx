import { Link, useLocation, useNavigate } from "react-router-dom";

function DashboardSidebar({
  user,
  onLogout,
}) {
  const location = useLocation();
  const navigate = useNavigate();

  function handleLogout() {
    if (onLogout) {
      onLogout();
      return;
    }

    localStorage.removeItem("recall_token");
    localStorage.removeItem("token");
    navigate("/login");
  }

  const isActive = (path) =>
    location.pathname === path;

  return (
    <aside className="dashboard-sidebar">
      <div className="dashboard-sidebar-top">
        <Link
          to="/dashboard"
          className="dashboard-logo"
        >
          <span className="dashboard-logo-icon">
            <img
              src="/recall-avatar.png"
              alt="Recall"
            />
          </span>

          <span>Recall</span>
        </Link>

        <nav className="dashboard-navigation">
          <Link
            to="/dashboard"
            className={
              isActive("/dashboard")
                ? "dashboard-nav-item active"
                : "dashboard-nav-item"
            }
          >
            <span className="dashboard-nav-icon">
              ◈
            </span>

            <span>All memories</span>
          </Link>
        </nav>
      </div>

      <div className="dashboard-sidebar-bottom">
        <div className="dashboard-user">
          <div className="dashboard-user-avatar">
            {(user?.name ||
              user?.email ||
              "U")
              .charAt(0)
              .toUpperCase()}
          </div>

          <div className="dashboard-user-info">
            <strong>
              {user?.name || "User"}
            </strong>

            <span>
              {user?.email || ""}
            </span>
          </div>
        </div>

        <button
          type="button"
          className="dashboard-logout-button"
          onClick={handleLogout}
        >
          <span>↪</span>
          Logout
        </button>
      </div>
    </aside>
  );
}

export default DashboardSidebar;