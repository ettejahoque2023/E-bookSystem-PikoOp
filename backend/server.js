// 🔴 MUST be first (before any other imports)
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import Book from "./models/bookModel.js";

// ---------------- INIT ----------------
const app = express();

// ---------------- DB ----------------
connectDB();

// ---------------- MIDDLEWARES ----------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://pikop.onrender.com",
    ],
    credentials: true,
  })
);

app.use(morgan("dev"));

// ---------------- API ROUTES ----------------
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/reviews", reviewRoutes);

// ---------------- ROOT ROUTE ----------------
app.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

// ---------------- PRODUCTION FRONTEND ----------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(
      path.join(__dirname, "../frontend/build", "index.html")
    );
  });
}

// ---------------- ERROR HANDLING ----------------

// Multer / upload errors
app.use((err, req, res, next) => {
  if (err?.message?.includes("Only images and PDFs")) {
    return res.status(400).json({ message: err.message });
  }

  if (err?.code === "LIMIT_UNEXPECTED_FILE") {
    return res.status(400).json({
      message: "Unexpected file field name",
    });
  }

  next(err);
});

// Not found + global error handler
app.use(notFound);
app.use(errorHandler);

// ---------------- SERVER ----------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `✅ Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
