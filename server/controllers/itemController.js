import mongoose from "mongoose";
import Item from "../models/Item.js";

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

    const updatedItem =
      await Item.findOneAndUpdate(
        {
          _id: id,
          user: req.user._id,
        },
        {
          type,
          title: title.trim(),
          description: description?.trim() || "",
          source:
            source?.trim() || "Unknown source",
          url: url?.trim() || "",
          tags: Array.isArray(tags) ? tags : [],
          userNote: userNote?.trim() || "",
          thumbnail: thumbnail || "",
        },
        {
          new: true,
          runValidators: true,
        }
      );

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: "Item not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Item updated successfully.",
      item: updatedItem,
    });
  } catch (error) {
    console.error("Update item error:", error);

    res.status(500).json({
      success: false,
      message: "Unable to update the item.",
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
      message: item.isFavourite
        ? "Item added to favourites."
        : "Item removed from favourites.",
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
        "Unable to update favourite status.",
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