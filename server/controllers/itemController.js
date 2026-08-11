import mongoose from "mongoose";
import Item from "../models/Item.js";
import { generateShareCode } from "../utils/generateShareCode.js";

export async function getItems(req, res) {
  try {
    const items = await Item.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: items.length,
      items,
    });
  } catch (error) {
    console.error("Get items error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to retrieve saved items.",
    });
  }
}

export async function getItemById(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid item ID.",
      });
    }

    const item = await Item.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found.",
      });
    }

    res.status(200).json({
      success: true,
      item,
    });
  } catch (error) {
    console.error("Get item error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to retrieve the item.",
    });
  }
}

export async function createItem(req, res) {
  try {
    const {
      type,
      title,
      description,
      source,
      url,
      tags,
      userNote,
      thumbnail,
    } = req.body;

    if (!type || !title?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Type and title are required.",
      });
    }

    const allowedTypes = [
      "link",
      "note",
      "screenshot",
    ];

    if (!allowedTypes.includes(type)) {
      return res.status(400).json({
        success: false,
        message:
          "Type must be link, note or screenshot.",
      });
    }

    if (type === "link" && !url?.trim()) {
      return res.status(400).json({
        success: false,
        message:
          "A URL is required for link items.",
      });
    }

    const newItem = await Item.create({
      user: req.user._id,
      type,
      title: title.trim(),
      description: description?.trim() || "",
      source: source?.trim() || "Unknown source",
      url: url?.trim() || "",
      tags: Array.isArray(tags) ? tags : [],
      userNote: userNote?.trim() || "",
      thumbnail: thumbnail || "",
    });

    res.status(201).json({
      success: true,
      message: "Item saved successfully.",
      item: newItem,
    });
  } catch (error) {
    console.error("Create item error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to save the item.",
    });
  }
}

export async function updateItem(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid item ID.",
      });
    }

    const {
      type,
      title,
      description,
      source,
      url,
      tags,
      userNote,
      thumbnail,
    } = req.body;

    const item = await Item.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found.",
      });
    }

    if (type !== undefined) {
      const allowedTypes = [
        "link",
        "note",
        "screenshot",
      ];

      if (!allowedTypes.includes(type)) {
        return res.status(400).json({
          success: false,
          message:
            "Type must be link, note or screenshot.",
        });
      }

      item.type = type;
    }

    if (title !== undefined) {
      if (!title.trim()) {
        return res.status(400).json({
          success: false,
          message: "Title is required.",
        });
      }

      item.title = title.trim();
    }

    if (description !== undefined) {
      item.description = description.trim();
    }

    if (source !== undefined) {
      item.source =
        source.trim() || "Unknown source";
    }

    if (url !== undefined) {
      item.url = url.trim();
    }

    if (tags !== undefined) {
      item.tags = Array.isArray(tags) ? tags : [];
    }

    if (userNote !== undefined) {
      item.userNote = userNote.trim();
    }

    if (thumbnail !== undefined) {
      item.thumbnail = thumbnail;
    }

    await item.save();

    res.status(200).json({
      success: true,
      message: "Item updated successfully.",
      item,
    });
  } catch (error) {
    console.error("Update item error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to update the item.",
    });
  }
}

export async function deleteItem(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid item ID.",
      });
    }

    const deletedItem =
      await Item.findOneAndDelete({
        _id: id,
        user: req.user._id,
      });

    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Item deleted successfully.",
    });
  } catch (error) {
    console.error("Delete item error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to delete the item.",
    });
  }
}

export async function toggleFavourite(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid item ID.",
      });
    }

    const item = await Item.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found.",
      });
    }

    item.isFavourite = !item.isFavourite;

    await item.save();

    res.status(200).json({
      success: true,
      message: "Favourite updated.",
      item,
    });
  } catch (error) {
    console.error(
      "Toggle favourite error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to update favourite.",
    });
  }
}

export async function createShare(req, res) {
  try {
    const { id } = req.params;
    const { expiresIn } = req.body;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid item ID.",
      });
    }

    const item = await Item.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found.",
      });
    }

    const shareCode = generateShareCode();

    let shareExpiresAt = null;

    if (expiresIn && expiresIn !== "never") {
      const expirationHours = Number(expiresIn);

      if (
        !Number.isFinite(expirationHours) ||
        expirationHours <= 0
      ) {
        return res.status(400).json({
          success: false,
          message: "Invalid expiration time.",
        });
      }

      shareExpiresAt = new Date(
        Date.now() +
          expirationHours * 60 * 60 * 1000
      );
    }

    item.shareCode = shareCode;
    item.shareEnabled = true;
    item.shareCreatedAt = new Date();
    item.shareExpiresAt = shareExpiresAt;

    await item.save();

    const shareUrl =
      `${process.env.CLIENT_URL || "http://localhost:5173"}` +
      `/shared/${shareCode}`;

    res.status(200).json({
      success: true,
      message: "Share link created.",
      shareCode,
      shareUrl,
      shareExpiresAt,
    });
  } catch (error) {
    console.error(
      "Create share error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to create share link.",
    });
  }
}

export async function regenerateShare(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid item ID.",
      });
    }

    const item = await Item.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found.",
      });
    }

    item.shareCode = generateShareCode();
    item.shareEnabled = true;
    item.shareCreatedAt = new Date();

    await item.save();

    const shareUrl =
      `${process.env.CLIENT_URL || "http://localhost:5173"}` +
      `/shared/${item.shareCode}`;

    res.status(200).json({
      success: true,
      message: "Share link regenerated.",
      shareCode: item.shareCode,
      shareUrl,
      shareExpiresAt: item.shareExpiresAt,
    });
  } catch (error) {
    console.error(
      "Regenerate share error:",
      error
    );

    res.status(500).json({
      success: false,
      message:
        "Unable to regenerate share link.",
    });
  }
}

export async function disableShare(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid item ID.",
      });
    }

    const item = await Item.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Item not found.",
      });
    }

    item.shareEnabled = false;

    await item.save();

    res.status(200).json({
      success: true,
      message: "Sharing disabled.",
    });
  } catch (error) {
    console.error(
      "Disable share error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Unable to disable sharing.",
    });
  }
}