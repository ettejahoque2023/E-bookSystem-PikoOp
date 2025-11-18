import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import path from "path";
import { fileURLToPath } from "url";  
 

import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import Book from "./models/bookModel.js";



// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

//Initialize express
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin:["http://localhost:5173",
  "https://e-booksystem-pikoop-1.onrender.com"
  ],
  credentials: true,
}));
app.use(morgan("dev"));


// Serve uploaded files
app.use("/uploads", express.static("uploads"));
app.use("/uploads/covers", express.static("uploads/covers"));
app.use("/uploads/books", express.static("uploads/books"));


//API Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/reviews", reviewRoutes);

// Test route
// app.get("/", (req, res) => {
//   res.send("📚 E-Book API is running...");
// });

// Get all books
app.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json({
      success: true,
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
});

// Serve React frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  // Any route not starting with /api serves index.html
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("📚 E-Book API is running...");
  });
}

// Error handling middleware (must come *after* routes)
app.use(notFound);
app.use(errorHandler);

// Server listening
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
