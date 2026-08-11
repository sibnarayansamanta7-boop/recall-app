import express from "express";

import {
  createItem,
  deleteItem,
  getItemById,
  getItems,
  toggleFavourite,
  updateItem,
} from "../controllers/itemController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);

router.get("/", getItems);

router.patch(
  "/:id/favourite",
  toggleFavourite
);

router.get("/:id", getItemById);

router.post("/", createItem);

router.put("/:id", updateItem);

router.delete("/:id", deleteItem);

export default router;