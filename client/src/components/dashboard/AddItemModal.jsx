import { useEffect, useState } from "react";
import ItemTypeSelector from "./ItemTypeSelector";

const createInitialFormData = () => ({
  type: "link",
  title: "",
  url: "",
  description: "",
  userNote: "",
  tags: "",
  screenshotFile: null,
  screenshotPreview: "",
});

function AddItemModal({
  isOpen,
  onClose,
  onAddItem,
  isSaving = false,
}) {
  const [formData, setFormData] = useState(
    createInitialFormData()
  );

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleEscape(event) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );

      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function resetForm() {
    setFormData(createInitialFormData());
    setErrors({});
  }

  function handleClose() {
    if (isSaving) {
  return;
}
    if (formData.screenshotPreview) {
      URL.revokeObjectURL(
        formData.screenshotPreview
      );
    }

    resetForm();

    if (typeof onClose === "function") {
      onClose();
    }
  }

  function handleTypeChange(type) {
    if (formData.screenshotPreview) {
      URL.revokeObjectURL(
        formData.screenshotPreview
      );
    }

    setFormData({
      ...createInitialFormData(),
      type,
    });

    setErrors({});
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [name]: "",
    }));
  }

  function handleScreenshotChange(event) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        screenshotFile:
          "Choose a JPEG, PNG or WebP image.",
      }));

      return;
    }

    const maximumFileSize =
      5 * 1024 * 1024;

    if (file.size > maximumFileSize) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        screenshotFile:
          "Image size must be less than 5 MB.",
      }));

      return;
    }

    if (formData.screenshotPreview) {
      URL.revokeObjectURL(
        formData.screenshotPreview
      );
    }

    const previewUrl =
      URL.createObjectURL(file);

    setFormData((currentData) => ({
      ...currentData,
      screenshotFile: file,
      screenshotPreview: previewUrl,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      screenshotFile: "",
    }));
  }

  function validateForm() {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title =
        "Title is required.";
    }

    if (formData.type === "link") {
      if (!formData.url.trim()) {
        newErrors.url =
          "Website URL is required.";
      } else if (
        !/^https?:\/\/.+/i.test(
          formData.url.trim()
        )
      ) {
        newErrors.url =
          "Enter a complete URL starting with http:// or https://.";
      }
    }

    if (
      formData.type === "note" &&
      !formData.description.trim()
    ) {
      newErrors.description =
        "Write your note content.";
    }

    if (
      formData.type === "screenshot" &&
      !formData.screenshotFile
    ) {
      newErrors.screenshotFile =
        "Choose a screenshot.";
    }

    if (!formData.userNote.trim()) {
      newErrors.userNote =
        "Explain why you are saving this item.";
    }

    return newErrors;
  }

  function getSourceName() {
    if (formData.type === "note") {
      return "Personal note";
    }

    if (
      formData.type === "screenshot"
    ) {
      return "Screenshot";
    }

    try {
      return new URL(
        formData.url
      ).hostname.replace("www.", "");
    } catch {
      return "Website";
    }
  }

  function getDefaultDescription() {
    if (formData.type === "link") {
      return "Saved website link.";
    }

    if (
      formData.type === "screenshot"
    ) {
      return "Saved screenshot.";
    }

    return "Personal note.";
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors =
      validateForm();

    if (
      Object.keys(validationErrors)
        .length > 0
    ) {
      setErrors(validationErrors);
      return;
    }

    const tagsArray = String(
      formData.tags || ""
    )
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const newItem = {
      id: `${Date.now()}-${Math.random()}`,

      type: formData.type,

      title: formData.title.trim(),

      description:
        formData.description.trim() ||
        getDefaultDescription(),

      source: getSourceName(),

      url:
        formData.type === "link"
          ? formData.url.trim()
          : "",

      tags: tagsArray,

      userNote:
        formData.userNote.trim(),

      savedAt:
        new Date().toISOString(),

      isFavourite: false,

      thumbnail:
        formData.type === "screenshot"
          ? formData.screenshotPreview
          : "",
    };

    if (
      typeof onAddItem === "function"
    ) {
      onAddItem(newItem);
    }

    /*
      IMPORTANT:
      Do NOT revoke screenshotPreview here.

      The dashboard card is currently using
      this temporary URL to display the image.
    */

    setFormData(
      createInitialFormData()
    );

    setErrors({});

    if (
      typeof onClose === "function"
    ) {
      onClose();
    }
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="add-item-modal-overlay"
      onMouseDown={handleClose}
    >
      <section
        className="add-item-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="add-item-heading"
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >
        <header className="add-item-modal-header">
          <div>
            <p className="add-item-modal-label">
              Build your memory
            </p>

            <h2 id="add-item-heading">
              Save something useful
            </h2>

            <p>
              Add enough context so your
              future self can find it easily.
            </p>
          </div>

          <button
            className="add-item-modal-close"
            type="button"
            aria-label="Close add item form"
            onClick={handleClose}
          >
            ×
          </button>
        </header>

        <form
          className="add-item-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <ItemTypeSelector
            selectedType={
              formData.type
            }
            onTypeChange={
              handleTypeChange
            }
          />

          <div className="add-item-form-group">
            <label htmlFor="item-title">
              Title <span>*</span>
            </label>

            <input
              id="item-title"
              name="title"
              type="text"
              placeholder={getTitlePlaceholder(
                formData.type
              )}
              value={formData.title}
              onChange={handleChange}
              className={
                errors.title
                  ? "form-field-error"
                  : ""
              }
            />

            {errors.title && (
              <p className="add-item-error">
                {errors.title}
              </p>
            )}
          </div>

          {formData.type === "link" && (
            <div className="add-item-form-group">
              <label htmlFor="item-url">
                Website URL{" "}
                <span>*</span>
              </label>

              <input
                id="item-url"
                name="url"
                type="url"
                placeholder="https://example.com/article"
                value={formData.url}
                onChange={handleChange}
                className={
                  errors.url
                    ? "form-field-error"
                    : ""
                }
              />

              {errors.url && (
                <p className="add-item-error">
                  {errors.url}
                </p>
              )}
            </div>
          )}

          {formData.type ===
            "screenshot" && (
              <div className="add-item-form-group">
                <label htmlFor="item-screenshot">
                  Screenshot{" "}
                  <span>*</span>
                </label>

                <label
                  htmlFor="item-screenshot"
                  className={
                    errors.screenshotFile
                      ? "screenshot-upload-area screenshot-upload-error"
                      : "screenshot-upload-area"
                  }
                >
                  {formData.screenshotPreview ? (
                    <img
                      src={
                        formData.screenshotPreview
                      }
                      alt="Selected screenshot preview"
                    />
                  ) : (
                    <>
                      <span className="screenshot-upload-icon">
                        ⇧
                      </span>

                      <strong>
                        Choose a screenshot
                      </strong>

                      <small>
                        JPEG, PNG or WebP,
                        maximum 5 MB
                      </small>
                    </>
                  )}
                </label>

                <input
                  id="item-screenshot"
                  className="screenshot-file-input"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={
                    handleScreenshotChange
                  }
                />

                {errors.screenshotFile && (
                  <p className="add-item-error">
                    {
                      errors.screenshotFile
                    }
                  </p>
                )}
              </div>
            )}

          <div className="add-item-form-group">
            <label htmlFor="item-description">
              {formData.type === "note"
                ? "Note content"
                : "Description"}

              {formData.type ===
                "note" && (
                  <span> *</span>
                )}
            </label>

            <textarea
              id="item-description"
              name="description"
              rows="4"
              placeholder={getDescriptionPlaceholder(
                formData.type
              )}
              value={
                formData.description
              }
              onChange={handleChange}
              className={
                errors.description
                  ? "form-field-error"
                  : ""
              }
            />

            {errors.description && (
              <p className="add-item-error">
                {errors.description}
              </p>
            )}
          </div>

          <div className="add-item-form-group">
            <label htmlFor="item-note">
              Why are you saving this?{" "}
              <span>*</span>
            </label>

            <textarea
              id="item-note"
              name="userNote"
              rows="3"
              placeholder="Useful for my React authentication project"
              value={formData.userNote}
              onChange={handleChange}
              className={
                errors.userNote
                  ? "form-field-error"
                  : ""
              }
            />

            {errors.userNote && (
              <p className="add-item-error">
                {errors.userNote}
              </p>
            )}

            <small className="add-item-help-text">
              Your personal reason will
              make future searches more
              accurate.
            </small>
          </div>

          <div className="add-item-form-group">
            <label htmlFor="item-tags">
              Tags
            </label>

            <input
              id="item-tags"
              name="tags"
              type="text"
              placeholder="React, JWT, Authentication"
              value={formData.tags}
              onChange={handleChange}
            />

            <small className="add-item-help-text">
              Separate multiple tags
              using commas.
            </small>
          </div>

          <footer className="add-item-form-actions">
            <button
              className="add-item-cancel-button"
              type="button"
              onClick={handleClose}
            >
              Cancel
            </button>

            <button
              className="add-item-save-button"
              type="submit"
              disabled={isSaving}
            >
              {isSaving
                ? "Saving..."
                : "Save item"}
            </button>
          </footer>
        </form>
      </section>
    </div>
  );
}

function getTitlePlaceholder(type) {
  if (type === "note") {
    return "React controlled forms";
  }

  if (type === "screenshot") {
    return "MongoDB connection error";
  }

  return "Complete JWT authentication guide";
}

function getDescriptionPlaceholder(
  type
) {
  if (type === "note") {
    return "Write the knowledge or idea you want to remember...";
  }

  if (type === "screenshot") {
    return "Describe what is visible in the screenshot...";
  }

  return "What does this page explain?";
}

export default AddItemModal;