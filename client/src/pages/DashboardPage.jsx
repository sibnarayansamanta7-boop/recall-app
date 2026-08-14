import { useEffect, useMemo, useState } from "react";

import AddItemModal from "../components/dashboard/AddItemModal";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import EmptyState from "../components/dashboard/EmptyState";
import FilterBar from "../components/dashboard/FilterBar";
import SavedItemCard from "../components/dashboard/SavedItemCard";
import StatCard from "../components/dashboard/StatCard";
import ShareItemModal from "../components/dashboard/ShareItemModal";

import {
  createItem,
  deleteItem,
  fetchItems,
  updateItem,
  toggleFavourite,
} from "../services/itemApi";

import { getCurrentUser } from "../services/authApi";

import "../styles/dashboard.css";
import "../styles/dashboard-modern.css";

function DashboardPage() {
  const [items, setItems] = useState([]);

  const [currentUser, setCurrentUser] = useState({
    name: "User",
  });

  const [activeSection, setActiveSection] =
    useState("home");

  const [activeFilter, setActiveFilter] =
    useState("all");

  const [sortOrder, setSortOrder] =
    useState("newest");

  const [searchQuery, setSearchQuery] =
    useState("");

  const [isSidebarOpen, setIsSidebarOpen] =
  useState(window.innerWidth > 1024);

  const [isAddModalOpen, setIsAddModalOpen] =
    useState(false);

  const [editingItem, setEditingItem] =
    useState(null);

  const [sharingItem, setSharingItem] =
    useState(null);

  const [isLoading, setIsLoading] =
    useState(true);

  const [isSaving, setIsSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    await Promise.all([
      loadItems(),
      loadUser(),
    ]);
  }

  async function loadItems() {
    try {
      setIsLoading(true);
      setError("");

      const data = await fetchItems();

      setItems(
        Array.isArray(data)
          ? data
          : data.items || []
      );
    } catch (error) {
      console.error(
        "Failed to load items:",
        error
      );

      setError(
        error.message ||
          "Unable to load your saved items."
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function loadUser() {
    try {
      const user = await getCurrentUser();

      setCurrentUser(user);
    } catch (error) {
      console.error(
        "Failed to load current user:",
        error
      );
    }
  }

  const currentHour =
    new Date().getHours();

  const greeting =
    currentHour < 12
      ? "Good morning"
      : currentHour < 18
      ? "Good afternoon"
      : "Good evening";

  const currentDate =
    new Intl.DateTimeFormat("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());

  const filteredItems = useMemo(() => {
    let result = [...items];

    if (activeSection === "favourites") {
      result = result.filter(
        (item) => item.isFavourite
      );
    }

    if (activeSection === "links") {
      result = result.filter(
        (item) => item.type === "link"
      );
    }

    if (activeSection === "notes") {
      result = result.filter(
        (item) => item.type === "note"
      );
    }

    if (activeSection === "screenshots") {
      result = result.filter(
        (item) => item.type === "screenshot"
      );
    }

    if (
      activeFilter === "link" ||
      activeFilter === "note" ||
      activeFilter === "screenshot"
    ) {
      result = result.filter(
        (item) =>
          item.type === activeFilter
      );
    }

    if (
      activeFilter === "favourite"
    ) {
      result = result.filter(
        (item) => item.isFavourite
      );
    }

    const normalizedSearch =
      searchQuery.trim().toLowerCase();

    if (normalizedSearch) {
      result = result.filter((item) => {
        const searchableText = [
          item.title,
          item.description,
          item.source,
          item.userNote,
          item.url,
          ...(Array.isArray(item.tags)
            ? item.tags
            : []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(
          normalizedSearch
        );
      });
    }

    result.sort((a, b) => {
      if (sortOrder === "title") {
        return (
          (a.title || "").localeCompare(
            b.title || ""
          )
        );
      }

      const dateA = new Date(
        a.createdAt ||
          a.savedAt ||
          0
      ).getTime();

      const dateB = new Date(
        b.createdAt ||
          b.savedAt ||
          0
      ).getTime();

      return sortOrder === "oldest"
        ? dateA - dateB
        : dateB - dateA;
    });

    return result;
  }, [
    items,
    activeSection,
    activeFilter,
    searchQuery,
    sortOrder,
  ]);

  const stats = useMemo(() => {
    const total = items.length;

    const links = items.filter(
      (item) => item.type === "link"
    ).length;

    const notes = items.filter(
      (item) => item.type === "note"
    ).length;

    const screenshots = items.filter(
      (item) =>
        item.type === "screenshot"
    ).length;

    const favourites = items.filter(
      (item) => item.isFavourite
    ).length;

    return {
      total,
      links,
      notes,
      screenshots,
      favourites,
    };
  }, [items]);

  function handleSectionChange(
    sectionId
  ) {
    setActiveSection(sectionId);

    if (sectionId === "home") {
      setActiveFilter("all");
    }

    if (sectionId === "all") {
      setActiveFilter("all");
    }

    if (sectionId === "favourites") {
      setActiveFilter("favourite");
    }

    if (sectionId === "links") {
      setActiveFilter("link");
    }

    if (sectionId === "notes") {
      setActiveFilter("note");
    }

    if (sectionId === "screenshots") {
      setActiveFilter("screenshot");
    }
  }

  function handleFilterChange(
    filterId
  ) {
    setActiveFilter(filterId);

    if (filterId === "all") {
      setActiveSection("all");
    } else if (
      filterId === "favourite"
    ) {
      setActiveSection("favourites");
    } else {
      setActiveSection(filterId);
    }
  }

  function handleClearFilters() {
    setSearchQuery("");
    setActiveFilter("all");
    setActiveSection("all");
  }

  function handleOpenAddModal() {
    setEditingItem(null);
    setIsAddModalOpen(true);
  }

  function handleEditItem(item) {
    setEditingItem(item);
    setIsAddModalOpen(true);
  }

  async function handleAddItem(
    itemData
  ) {
    try {
      setIsSaving(true);
      setError("");

      if (editingItem) {
        const itemId =
          editingItem._id ||
          editingItem.id;

        const data = await updateItem(
          itemId,
          itemData
        );

        const updatedItem =
          data.item || data;

        setItems(
          (currentItems) =>
            currentItems.map((item) =>
              (item._id || item.id) ===
              itemId
                ? updatedItem
                : item
            )
        );
      } else {
        const data =
          await createItem(itemData);

        const newItem =
          data.item || data;

        if (newItem) {
          setItems(
            (currentItems) => [
              newItem,
              ...currentItems,
            ]
          );
        }
      }

      setEditingItem(null);
      setIsAddModalOpen(false);
    } catch (error) {
      console.error(
        "Failed to save item:",
        error
      );

      setError(
        error.message ||
          "Unable to save this item."
      );
    } finally {
      setIsSaving(false);
    }
  }

  async function handleToggleFavourite(
    itemId
  ) {
    try {
      setError("");

      const data =
        await toggleFavourite(itemId);

      setItems(
        (currentItems) =>
          currentItems.map((item) =>
            (item._id || item.id) ===
            itemId
              ? data.item
              : item
          )
      );
    } catch (error) {
      console.error(
        "Failed to update favourite:",
        error
      );

      setError(
        error.message ||
          "Unable to update favourite."
      );
    }
  }

  async function handleDeleteItem(
    itemId
  ) {
    const shouldDelete =
      window.confirm(
        "Are you sure you want to delete this saved item?"
      );

    if (!shouldDelete) {
      return;
    }

    try {
      setError("");

      await deleteItem(itemId);

      setItems(
        (currentItems) =>
          currentItems.filter(
            (item) =>
              (item._id || item.id) !==
              itemId
          )
      );
    } catch (error) {
      console.error(
        "Failed to delete item:",
        error
      );

      setError(
        error.message ||
          "Unable to delete this item."
      );
    }
  }

  function handleShareItem(item) {
    setSharingItem(item);
  }

  function handleSearchChange(value) {
    setSearchQuery(value);
  }

  function handleCloseItemModal() {
    setIsAddModalOpen(false);
    setEditingItem(null);
  }

  return (
    <main className="dashboard-layout">
      <DashboardSidebar
        activeSection={activeSection}
        onSectionChange={
          handleSectionChange
        }
        isOpen={isSidebarOpen}
        onClose={() =>
          setIsSidebarOpen(false)
        }
      />

      <section className="dashboard-main">
        <DashboardHeader
  searchQuery={searchQuery}
  onSearchChange={
    handleSearchChange
  }
  onMenuClick={() =>
    setIsSidebarOpen(
      (current) => !current
    )
  }
  onAddItem={
    handleOpenAddModal
  }
  currentUser={currentUser}
  isSidebarOpen={isSidebarOpen}
/>

        <div className="dashboard-content">
          <section className="dashboard-welcome">
            <div>
              <p className="dashboard-date">
                {currentDate}
              </p>

              <h1>
                {greeting},{" "}
                {currentUser.name
                  ? currentUser.name.split(
                      " "
                    )[0]
                  : "User"}
                .
              </h1>

              <p>
                Your saved knowledge,
                ready whenever you need it.
              </p>
            </div>

            <button
              className="dashboard-add-button"
              type="button"
              onClick={
                handleOpenAddModal
              }
            >
              <span>＋</span>
              Add item
            </button>
          </section>

          {error && (
            <div className="dashboard-error-message">
              {error}
            </div>
          )}

          <section className="dashboard-stats">
            <StatCard
              icon="▦"
              label="Total items"
              value={stats.total}
              description="Everything you've saved"
            />

            <StatCard
              icon="↗"
              label="Links"
              value={stats.links}
              description="Web resources"
            />

            <StatCard
              icon="✎"
              label="Notes"
              value={stats.notes}
              description="Personal knowledge"
            />

            <StatCard
              icon="▣"
              label="Screenshots"
              value={stats.screenshots}
              description="Visual memories"
            />

            <StatCard
              icon="★"
              label="Favourites"
              value={stats.favourites}
              description="Your important items"
            />
          </section>

          <FilterBar
            activeFilter={activeFilter}
            onFilterChange={
              handleFilterChange
            }
            sortOrder={sortOrder}
            onSortChange={
              setSortOrder
            }
            resultCount={
              filteredItems.length
            }
          />

          <section className="dashboard-items-section">
            {isLoading ? (
              <div className="dashboard-loading-state">
                <div className="dashboard-loading-spinner" />

                <p>
                  Loading your saved
                  knowledge...
                </p>
              </div>
            ) : filteredItems.length ===
              0 ? (
              <EmptyState
                searchQuery={
                  searchQuery
                }
                onClearFilters={
                  handleClearFilters
                }
                onAddItem={
                  handleOpenAddModal
                }
              />
            ) : (
              <div className="saved-items-grid">
  {filteredItems.map((item) => (
    <SavedItemCard
      key={item._id || item.id}
      item={item}
      onToggleFavourite={handleToggleFavourite}
      onDelete={handleDeleteItem}
      onEdit={handleEditItem}
      onShare={handleShareItem}
    />
  ))}
</div>
            )}
          </section>
        </div>
      </section>

      {isAddModalOpen && (
        <AddItemModal
          item={editingItem}
          onClose={
            handleCloseItemModal
          }
          onSubmit={
            handleAddItem
          }
          isSaving={isSaving}
        />
      )}

      {sharingItem && (
        <ShareItemModal
          item={sharingItem}
          onClose={() =>
            setSharingItem(null)
          }
          onShareUpdated={() => {
            loadItems();
          }}
        />
      )}
      <footer className="dashboard-footer">
  <div className="dashboard-footer-brand">
    <strong>Recall</strong>
    <span>Save it. Find it. Recall it.</span>
  </div>

  <div className="dashboard-footer-socials">
    <a
      href="https://www.linkedin.com/in/sibnarayan-samanta-dev/"
      target="_blank"
      rel="noreferrer"
      aria-label="LinkedIn"
      className="social-linkedin"
    >
      <i className="fa-brands fa-linkedin-in" />
    </a>

    <a
      href="https://github.com/sibnarayansamanta7-boop"
      target="_blank"
      rel="noreferrer"
      aria-label="GitHub"
      className="social-github"
    >
      <i className="fa-brands fa-github" />
    </a>

    <a
      href="https://www.instagram.com/trollface8150_"
      target="_blank"
      rel="noreferrer"
      aria-label="Instagram"
      className="social-instagram"
    >
      <i className="fa-brands fa-instagram" />
    </a>
  </div>

  <span className="dashboard-footer-copy">
    © 2026 Recall
  </span>
</footer>
    </main>
  );
}

export default DashboardPage;