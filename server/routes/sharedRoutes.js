import express from "express";

import {
  getSharedItem,
} from "../controllers/sharedController.js";

const router = express.Router();

router.get(
  "/:shareCode",
  getSharedItem
);

export default router;