import Item from "../models/Item.js";

export async function getSharedItem(
  req,
  res
) {
  try {
    const { shareCode } = req.params;

    if (!shareCode) {
      return res.status(400).json({
        success: false,
        message: "Share code is required.",
      });
    }

    const item = await Item.findOne({
      shareCode,
      shareEnabled: true,
    }).select(
      "-user -shareCode"
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message:
          "This share link is invalid or no longer available.",
      });
    }

    if (
      item.shareExpiresAt &&
      new Date(item.shareExpiresAt) < new Date()
    ) {
      return res.status(410).json({
        success: false,
        message:
          "This share link has expired.",
      });
    }

    res.status(200).json({
      success: true,
      item,
    });
  } catch (error) {
    console.error(
      "Get shared item error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to retrieve shared item.",
    });
  }
}