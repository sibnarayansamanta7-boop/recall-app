import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import connectDatabase from "./config/db.js";

import itemRoutes from "./routes/itemRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import sharedRoutes from "./routes/sharedRoutes.js";

dotenv.config();

const app = express();

const PORT =
  process.env.PORT || 8001;

app.use(
  cors({
    origin:
      "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message:
      "Recall API is running",
  });
});

app.get(
  "/api/health",
  (req, res) => {
    res.status(200).json({
      success: true,
      status: "healthy",
      project: "Recall",
    });
  }
);

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/items",
  itemRoutes
);

app.use(
  "/api/shared",
  sharedRoutes
);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found.",
  });
});

async function startServer() {
  try {
    await connectDatabase();

    app.listen(
      PORT,
      () => {
        console.log(
          `Recall server is running on port ${PORT}`
        );
      }
    );
  } catch (error) {
    console.error(
      "Server startup failed:",
      error
    );

    process.exit(1);
  }
}

startServer();