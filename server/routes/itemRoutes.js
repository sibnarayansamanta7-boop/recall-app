import express from "express";

import {
  createItem,
  deleteItem,
  getItemById,
  getItems,
  updateItem,
  toggleFavourite,
  createShare,
  regenerateShare,
  disableShare,
} from "../controllers/itemController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getItems);

router.get("/:id", getItemById);

router.post("/", createItem);

router.put("/:id", updateItem);

router.delete("/:id", deleteItem);

router.patch(
  "/:id/favourite",
  toggleFavourite
);

router.post(
  "/:id/share",
  createShare
);

router.post(
  "/:id/share/regenerate",
  regenerateShare
);

router.patch(
  "/:id/share/disable",
  disableShare
);

export default router;