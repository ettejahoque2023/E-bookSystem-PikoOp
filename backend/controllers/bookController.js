import fs from "fs";
import Book from "../models/bookModel.js";

// UPLOAD A BOOK
export const uploadBook = async (req, res) => {
  try {
    const { title, author, description, genre } = req.body;

    if (!req.files || !req.files.coverImage || !req.files.bookFile) {
      return res.status(400).json({ message: "Files are required" });
    }

    const coverImage = req.files.coverImage[0].path;
    const bookFile = req.files.bookFile[0].path;

    const newBook = await Book.create({
      title,
      author,
      description,
      genre,
      coverImage,
      bookFile,
      uploader: req.user._id,   // FIXED
    });

    res.status(201).json({
      message: "Book uploaded successfully",
      book: newBook,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// GET ALL BOOKS
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("uploader", "name email");
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET a single book by ID
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("uploader", "name email");
    
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET BOOKS BY USER
export const getBooksByUser = async (req, res) => {
  try {
    const books = await Book.find({ uploader: req.params.userId });  // FIXED
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user books" });
  }
};




// DELETE A BOOK
export const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Check owner
    if (book.uploader.toString() !== req.user._id.toString()) {  // FIXED
      return res.status(403).json({ message: "Not authorized to delete this book" });
    }

    // Remove files
    const removeFile = (filePath) => {
      try {
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      } catch (err) {
        console.error("File deletion error:", err);
      }
    };

    removeFile(book.coverImage);
    removeFile(book.bookFile);

    // Delete DB record
    await book.deleteOne();

    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: error.message });
  }
};
