import express from "express";
import {
  uploadBook,
  getAllBooks,
  getBookById,
  getBooksByUser,
  deleteBook
} from "../controllers/bookController.js";

import { upload } from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

//Get all books (Homepage)
router.get("/", getAllBooks);

//Get a single book (Book Detail Page)
router.get("/:id", getBookById);

//Upload a new book
router.post(
  "/upload",
  protect,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "bookFile", maxCount: 1 }
  ]),
  uploadBook
);

//Get books uploaded by a specific user (Profile Page)
router.get("/user/:userId", getBooksByUser);

//Delete a book by ID (Only uploader can delete)
router.delete("/:id", protect, deleteBook);

export default router;
