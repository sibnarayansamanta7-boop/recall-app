import express from "express";

import {
  createItem,
  deleteItem,
  getItemById,
  getItems,
} from "../controllers/itemController.js";

const router = express.Router();

router.get("/", getItems);

router.get("/:id", getItemById);

router.post("/", createItem);

router.delete("/:id", deleteItem);

export default router;