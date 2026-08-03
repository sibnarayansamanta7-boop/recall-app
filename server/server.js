import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8001;

// Middleware
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Recall API is running"
  });
});

// Health-check route
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "healthy",
    project: "Recall",
    developer:"Sibnarayan Samanta"
  });
});

app.listen(PORT, () => {
  console.log(`Recall server is running on port ${PORT}`);
});