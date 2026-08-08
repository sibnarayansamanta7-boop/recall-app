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
} from "../services/itemApi";

import "../styles/dashboard.css";

function DashboardPage() {
  const [items, setItems] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeSection, setActiveSection] = useState("home");
  const [sortOrder, setSortOrder] = useState("newest");

  const [isSidebarOpen, setIsSidebarOpen] =
    useState(false);

  const [isAddModalOpen, setIsAddModalOpen] =
    useState(false);

  const [isLoading, setIsLoading] =
    useState(true);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [isSaving, setIsSaving] =
    useState(false);

  useEffect(() => {
    loadItems();
  }, []);

  async function loadItems() {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const databaseItems = await fetchItems();

      setItems(databaseItems);
    } catch (error) {
      console.error(
        "Failed to load items:",
        error
      );

      setErrorMessage(
        "Could not load your saved items. Make sure the backend is running."
      );
    } finally {
      setIsLoading(false);
    }
  }

  function handleSectionChange(section) {
    setActiveSection(section);

    if (section === "favourites") {
      setActiveFilter("favourite");
    } else if (section === "links") {
      setActiveFilter("link");
    } else if (section === "notes") {
      setActiveFilter("note");
    } else if (section === "screenshots") {
      setActiveFilter("screenshot");
    } else {
      setActiveFilter("all");
    }
  }

  function handleOpenAddModal() {
    setIsAddModalOpen(true);
  }

  function handleCloseAddModal() {
    if (!isSaving) {
      setIsAddModalOpen(false);
    }
  }

  async function handleAddItem(newItem) {
    try {
      setIsSaving(true);
      setErrorMessage("");

      const itemToSend = {
        type: newItem.type,
        title: newItem.title,
        description:
          newItem.description || "",
        source:
          newItem.source ||
          "Unknown source",
        url: newItem.url || "",
        tags: Array.isArray(newItem.tags)
          ? newItem.tags
          : [],
        userNote:
          newItem.userNote || "",
        thumbnail:
          newItem.thumbnail || "",
      };

      const savedItem =
        await createItem(itemToSend);

      setItems((currentItems) => [
        savedItem,
        ...currentItems,
      ]);

      setSearchQuery("");
      setActiveFilter("all");
      setActiveSection("home");

      setIsAddModalOpen(false);
    } catch (error) {
      console.error(
        "Failed to save item:",
        error
      );

      setErrorMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  }

  function handleToggleFavourite(itemId) {
    setItems((currentItems) =>
      currentItems.map((item) =>
        getItemId(item) === itemId
          ? {
              ...item,
              isFavourite:
                !item.isFavourite,
            }
          : item
      )
    );
  }

  async function handleDeleteItem(itemId) {
    const itemToDelete = items.find(
      (item) =>
        getItemId(item) === itemId
    );

    const shouldDelete =
      window.confirm(
        `Delete "${
          itemToDelete?.title ||
          "this item"
        }"?`
      );

    if (!shouldDelete) {
      return;
    }

    try {
      setErrorMessage("");

      await deleteItem(itemId);

      setItems((currentItems) =>
        currentItems.filter(
          (item) =>
            getItemId(item) !== itemId
        )
      );
    } catch (error) {
      console.error(
        "Failed to delete item:",
        error
      );

      setErrorMessage(error.message);
    }
  }

  function handleClearFilters() {
    setSearchQuery("");
    setActiveFilter("all");
    setActiveSection("home");
  }

  const filteredItems = useMemo(() => {
    const normalizedSearch =
      String(searchQuery)
        .trim()
        .toLowerCase();

    const matchingItems =
      items.filter((item) => {
        const title = String(
          item?.title || ""
        ).toLowerCase();

        const description = String(
          item?.description || ""
        ).toLowerCase();

        const source = String(
          item?.source || ""
        ).toLowerCase();

        const userNote = String(
          item?.userNote || ""
        ).toLowerCase();

        const tags = Array.isArray(
          item?.tags
        )
          ? item.tags.map((tag) =>
              String(tag).toLowerCase()
            )
          : [];

        const matchesSearch =
          !normalizedSearch ||
          title.includes(
            normalizedSearch
          ) ||
          description.includes(
            normalizedSearch
          ) ||
          source.includes(
            normalizedSearch
          ) ||
          userNote.includes(
            normalizedSearch
          ) ||
          tags.some((tag) =>
            tag.includes(
              normalizedSearch
            )
          );

        const matchesFilter =
          activeFilter === "all" ||
          item?.type === activeFilter ||
          (activeFilter ===
            "favourite" &&
            Boolean(
              item?.isFavourite
            ));

        return (
          matchesSearch &&
          matchesFilter
        );
      });

    return [...matchingItems].sort(
      (firstItem, secondItem) => {
        if (
          sortOrder === "title"
        ) {
          return String(
            firstItem?.title || ""
          ).localeCompare(
            String(
              secondItem?.title || ""
            )
          );
        }

        const firstTime =
          getItemTime(firstItem);

        const secondTime =
          getItemTime(secondItem);

        if (
          sortOrder === "oldest"
        ) {
          return (
            firstTime -
            secondTime
          );
        }

        return (
          secondTime -
          firstTime
        );
      }
    );
  }, [
    items,
    searchQuery,
    activeFilter,
    sortOrder,
  ]);

  const totalLinks = items.filter(
    (item) =>
      item?.type === "link"
  ).length;

  const totalNotes = items.filter(
    (item) =>
      item?.type === "note"
  ).length;

  const totalFavourites =
    items.filter((item) =>
      Boolean(item?.isFavourite)
    ).length;

  const currentDate =
    new Intl.DateTimeFormat(
      "en-IN",
      {
        weekday: "long",
        day: "numeric",
        month: "long",
      }
    ).format(new Date());

  return (
    <div className="dashboard-page">
      <DashboardSidebar
        activeSection={activeSection}
        onSectionChange={
          handleSectionChange
        }
        isOpen={
          isSidebarOpen
        }
        onClose={() =>
          setIsSidebarOpen(false)
        }
      />

      <div className="dashboard-main-area">
        <DashboardHeader
          searchQuery={searchQuery}
          onSearchChange={
            setSearchQuery
          }
          onMenuClick={() =>
            setIsSidebarOpen(true)
          }
          onAddItem={
            handleOpenAddModal
          }
        />

        <main className="dashboard-content">
          <section className="dashboard-welcome-section">
            <div>
              <p className="dashboard-eyebrow">
                {currentDate}
              </p>

              <h1>
                Good day, Sibu.
              </h1>

              <p>
                Everything useful you
                saved is ready to be
                rediscovered.
              </p>
            </div>

            <button
              className="dashboard-welcome-add"
              type="button"
              onClick={
                handleOpenAddModal
              }
            >
              <span>+</span>
              Save something
            </button>
          </section>

          {errorMessage && (
            <div className="dashboard-api-error">
              <div>
                <strong>
                  Something went wrong
                </strong>

                <p>
                  {errorMessage}
                </p>
              </div>

              <button
                type="button"
                onClick={loadItems}
              >
                Try again
              </button>
            </div>
          )}

          <section
            className="dashboard-stat-grid"
            aria-label="Saved item statistics"
          >
            <StatCard
              icon="▦"
              label="All saved items"
              value={items.length}
              description="Your complete memory"
            />

            <StatCard
              icon="↗"
              label="Links"
              value={totalLinks}
              description="Web resources"
            />

            <StatCard
              icon="✎"
              label="Notes"
              value={totalNotes}
              description="Personal knowledge"
            />

            <StatCard
              icon="★"
              label="Favourites"
              value={
                totalFavourites
              }
              description="Important memories"
            />
          </section>

          <section className="dashboard-library-section">
            <FilterBar
              activeFilter={
                activeFilter
              }
              onFilterChange={
                setActiveFilter
              }
              sortOrder={
                sortOrder
              }
              onSortChange={
                setSortOrder
              }
              resultCount={
                filteredItems.length
              }
            />

            {isLoading ? (
              <div className="dashboard-loading-state">
                <div className="dashboard-loading-spinner" />

                <h3>
                  Loading your memories...
                </h3>

                <p>
                  Recall is fetching your
                  saved items from MongoDB.
                </p>
              </div>
            ) : filteredItems.length >
              0 ? (
              <div className="saved-items-grid">
                {filteredItems.map(
                  (item, index) => (
                    <SavedItemCard
                      key={
                        getItemId(
                          item
                        ) ||
                        `${item?.title || "item"}-${index}`
                      }
                      item={item}
                      onToggleFavourite={
                        handleToggleFavourite
                      }
                      onDelete={
                        handleDeleteItem
                      }
                    />
                  )
                )}
              </div>
            ) : (
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
            )}
          </section>
        </main>
      </div>

      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={
          handleCloseAddModal
        }
        onAddItem={
          handleAddItem
        }
        isSaving={
          isSaving
        }
      />
    </div>
  );
}

function getItemId(item) {
  return item?._id || item?.id;
}

function getItemTime(item) {
  const dateValue =
    item?.createdAt ||
    item?.savedAt;

  if (!dateValue) {
    return 0;
  }

  const time =
    new Date(dateValue).getTime();

  return Number.isNaN(time)
    ? 0
    : time;
}

export default DashboardPage;