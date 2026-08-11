import { useEffect, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import {
  createShare,
  regenerateShare,
  disableShare,
} from "../../services/itemApi";

function ShareItemModal({
  item,
  onClose,
  onShareUpdated,
}) {
  const [shareData, setShareData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");

  const itemId = item?._id || item?.id;

  useEffect(() => {
    async function loadShare() {
      if (!itemId) {
        setError("Unable to identify this item.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        /*
         * Create a share if one does not already exist.
         * Your backend already supports createShare().
         */
        const data = await createShare(itemId);

        setShareData(
          data?.share ||
            data?.data ||
            data
        );
      } catch (err) {
        console.error("Failed to create share:", err);

        setError(
          err.message ||
            "Unable to create sharing link."
        );
      } finally {
        setLoading(false);
      }
    }

    loadShare();
  }, [itemId]);

  function getShareCode() {
    return (
      shareData?.shareCode ||
      shareData?.code ||
      shareData?.token ||
      shareData?.share?.shareCode ||
      ""
    );
  }

  const shareCode = getShareCode();

  const shareLink = shareCode
    ? `${window.location.origin}/shared/${shareCode}`
    : "";

  async function handleCopyCode() {
    if (!shareCode) return;

    try {
      await navigator.clipboard.writeText(
        shareCode
      );

      setCopied("code");

      setTimeout(() => {
        setCopied("");
      }, 1500);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  }

  async function handleCopyLink() {
    if (!shareLink) return;

    try {
      await navigator.clipboard.writeText(
        shareLink
      );

      setCopied("link");

      setTimeout(() => {
        setCopied("");
      }, 1500);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  }

  async function handleRegenerate() {
    if (!itemId) return;

    try {
      setActionLoading(true);
      setError("");

      const data = await regenerateShare(itemId);

      setShareData(
        data?.share ||
          data?.data ||
          data
      );

      if (typeof onShareUpdated === "function") {
        onShareUpdated();
      }
    } catch (err) {
      console.error(
        "Failed to regenerate share:",
        err
      );

      setError(
        err.message ||
          "Unable to regenerate share."
      );
    } finally {
      setActionLoading(false);
    }
  }

  async function handleDisable() {
    if (!itemId) return;

    const confirmed = window.confirm(
      "Disable sharing for this item?"
    );

    if (!confirmed) return;

    try {
      setActionLoading(true);
      setError("");

      await disableShare(itemId);

      if (typeof onShareUpdated === "function") {
        onShareUpdated();
      }

      onClose();
    } catch (err) {
      console.error(
        "Failed to disable share:",
        err
      );

      setError(
        err.message ||
          "Unable to disable sharing."
      );
    } finally {
      setActionLoading(false);
    }
  }

  return (
    <div
      className="share-modal-overlay"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div
        className="share-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-modal-title"
      >
        <div className="share-modal-header">
          <div>
            <p className="share-modal-eyebrow">
              RECALL SHARE
            </p>

            <h2 id="share-modal-title">
              Share this item
            </h2>

            <p>
              Give someone access to this saved
              item without requiring them to log in.
            </p>
          </div>

          <button
            type="button"
            className="share-modal-close"
            onClick={onClose}
            aria-label="Close share dialog"
          >
            ×
          </button>
        </div>

        <div className="share-modal-divider" />

        {loading && (
          <div className="share-modal-loading">
            Creating secure share...
          </div>
        )}

        {!loading && error && (
          <div className="share-modal-error">
            {error}
          </div>
        )}

        {!loading && !error && shareCode && (
          <>
            <div className="share-code-section">
              <label>Share code</label>

              <div className="share-code">
                {shareCode}
              </div>

              <button
                type="button"
                className="share-copy-button"
                onClick={handleCopyCode}
              >
                {copied === "code"
                  ? "Copied!"
                  : "Copy code"}
              </button>
            </div>

            <div className="share-link-section">
              <label>Share link</label>

              <input
                type="text"
                value={shareLink}
                readOnly
              />

              <button
                type="button"
                className="share-copy-button"
                onClick={handleCopyLink}
              >
                {copied === "link"
                  ? "Copied!"
                  : "Copy link"}
              </button>
            </div>

            <div className="share-qr-section">
              <label>Scan QR code</label>

              <div className="share-qr-container">
                <QRCodeCanvas
                  value={shareLink}
                  size={220}
                  bgColor="#ffffff"
                  fgColor="#111827"
                  level="H"
                  includeMargin={true}
                />
              </div>

              <p>
                Scan this QR code to open the
                shared item.
              </p>
            </div>

            <div className="share-modal-actions">
              <button
                type="button"
                className="share-regenerate-button"
                onClick={handleRegenerate}
                disabled={actionLoading}
              >
                {actionLoading
                  ? "Working..."
                  : "Regenerate code"}
              </button>

              <button
                type="button"
                className="share-disable-button"
                onClick={handleDisable}
                disabled={actionLoading}
              >
                Disable sharing
              </button>
            </div>
          </>
        )}

        <div className="share-modal-footer">
          <button
            type="button"
            className="share-close-button"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShareItemModal;