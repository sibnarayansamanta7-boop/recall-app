import { useEffect, useMemo, useState } from "react";

import AddItemModal from "../components/dashboard/AddItemModal";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import EmptyState from "../components/dashboard/EmptyState";
import FilterBar from "../components/dashboard/FilterBar";
import SavedItemCard from "../components/dashboard/SavedItemCard";
import StatCard from "../components/dashboard/StatCard";

import {
  createItem,
  deleteItem,
  fetchItems,
  updateItem,
} from "../services/itemApi";

import { getCurrentUser } from "../services/authApi";

import "../styles/dashboard.css";

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
    useState(false);

  const [isAddModalOpen, setIsAddModalOpen] =
    useState(false);

  const [editingItem, setEditingItem] =
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

      setItems(data.items || []);
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
    new Intl.DateTimeFormat(
      "en-IN",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    ).format(new Date());

  const filteredItems = useMemo(() => {
    let result = [...items];

    if (
      activeSection === "favourites"
    ) {
      result = result.filter(
        (item) => item.isFavourite
      );
    }

    if (
      activeSection === "links"
    ) {
      result = result.filter(
        (item) =>
          item.type === "link"
      );
    }

    if (
      activeSection === "notes"
    ) {
      result = result.filter(
        (item) =>
          item.type === "note"
      );
    }

    if (
      activeSection === "screenshots"
    ) {
      result = result.filter(
        (item) =>
          item.type === "screenshot"
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
      searchQuery
        .trim()
        .toLowerCase();

    if (normalizedSearch) {
      result = result.filter(
        (item) => {
          const searchableText = [
            item.title,
            item.description,
            item.source,
            item.userNote,
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
        }
      );
    }

    result.sort((a, b) => {
      if (sortOrder === "title") {
        return (
          a.title || ""
        ).localeCompare(
          b.title || ""
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
      (item) =>
        item.type === "link"
    ).length;

    const notes = items.filter(
      (item) =>
        item.type === "note"
    ).length;

    const screenshots = items.filter(
      (item) =>
        item.type === "screenshot"
    ).length;

    const favourites = items.filter(
      (item) =>
        item.isFavourite
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

    if (
      sectionId === "home" ||
      sectionId === "all"
    ) {
      setActiveFilter("all");
    }

    if (
      sectionId === "favourites"
    ) {
      setActiveFilter("favourite");
    }

    if (sectionId === "links") {
      setActiveFilter("link");
    }

    if (sectionId === "notes") {
      setActiveFilter("note");
    }

    if (
      sectionId === "screenshots"
    ) {
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

        const data =
          await updateItem(
            itemId,
            itemData
          );

        if (data.item) {
          setItems(
            (currentItems) =>
              currentItems.map(
                (item) =>
                  (
                    item._id ||
                    item.id
                  ) === itemId
                    ? data.item
                    : item
              )
          );
        }
      } else {
        const data =
          await createItem(
            itemData
          );

        if (data.item) {
          setItems(
            (currentItems) => [
              data.item,
              ...currentItems,
            ]
          );
        }
      }

      setIsAddModalOpen(false);
      setEditingItem(null);
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

  function handleEditItem(item) {
    setEditingItem(item);
    setIsAddModalOpen(true);
  }

  function handleToggleFavourite(
    itemId
  ) {
    setItems(
      (currentItems) =>
        currentItems.map(
          (item) =>
            (
              item._id ||
              item.id
            ) === itemId
              ? {
                  ...item,
                  isFavourite:
                    !item.isFavourite,
                }
              : item
        )
    );
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
              (
                item._id ||
                item.id
              ) !== itemId
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

  function handleSearchChange(
    value
  ) {
    setSearchQuery(value);
  }

  function handleOpenAddModal() {
    setEditingItem(null);
    setIsAddModalOpen(true);
  }

  function handleCloseAddModal() {
    setIsAddModalOpen(false);
    setEditingItem(null);
  }

  return (
    <div className="dashboard-page">
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

      <section className="dashboard-main-area">
        <DashboardHeader
          searchQuery={searchQuery}
          onSearchChange={
            handleSearchChange
          }
          onMenuClick={() =>
            setIsSidebarOpen(true)
          }
          onAddItem={
            handleOpenAddModal
          }
        />

        <div className="dashboard-content">
          <section className="dashboard-welcome-section">
            <div>
              <p className="dashboard-eyebrow">
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
                ready whenever you
                need it.
              </p>
            </div>

            <button
              className="dashboard-welcome-add"
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
            <div className="dashboard-api-error">
              <div>
                <strong>
                  Something went wrong
                </strong>

                <p>{error}</p>
              </div>

              <button
                type="button"
                onClick={loadItems}
              >
                Try again
              </button>
            </div>
          )}

          <section className="dashboard-stat-grid">
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
              value={
                stats.screenshots
              }
              description="Visual memories"
            />

            <StatCard
              icon="★"
              label="Favourites"
              value={
                stats.favourites
              }
              description="Your important items"
            />
          </section>

          <FilterBar
            activeFilter={
              activeFilter
            }
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
              <div className="dashboard-items-grid">
                {filteredItems.map(
                  (item) => (
                    <SavedItemCard
                      key={
                        item._id ||
                        item.id
                      }
                      item={item}
                      onToggleFavourite={
                        handleToggleFavourite
                      }
                      onDelete={
                        handleDeleteItem
                      }
                      onEdit={
                        handleEditItem
                      }
                    />
                  )
                )}
              </div>
            )}
          </section>
        </div>
      </section>

      {isAddModalOpen && (
        <AddItemModal
          item={editingItem}
          onClose={
            handleCloseAddModal
          }
          onSubmit={
            handleAddItem
          }
          isSaving={isSaving}
        />
      )}
    </div>
  );
}

export default DashboardPage;