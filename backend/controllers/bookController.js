import axios from "axios";
import Book from "../models/bookModel.js";
import cloudinary from "../config/cloudinary.js";


const uploadToCloudinary = (buffer, options) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    stream.end(buffer);
  });
};

// UPLOAD A BOOK
export const uploadBook = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const { title, author, description, genre } = req.body;

    const cover = req.files.find(f => f.fieldname === "coverImage");
    const book  = req.files.find(f => f.fieldname === "bookFile");

    if (!cover || !book) {
      return res.status(400).json({ message: "Files are required" });
    }

    // ✅ upload image
    const coverResult = await uploadToCloudinary(cover.buffer, {
      folder: "ebooks/covers",
      resource_type: "image",
    });

    // ✅ upload pdf
    const bookResult = await uploadToCloudinary(book.buffer, {
      folder: "ebooks/books",
      resource_type: "raw",
    });

    // 🔥 THESE VALUES ARE NOW GUARANTEED
    const newBook = await Book.create({
      title,
      author,
      description,
      genre,
      coverImage: coverResult.secure_url,
      bookFile: bookResult.secure_url,
      uploader: req.user._id,
    });

    res.status(201).json({
      message: "Book uploaded successfully",
      book: newBook,
    });

  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};
/* ================= GET ALL BOOKS ================= */
export const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("uploader", "name email");
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET BOOK BY ID ================= */
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("uploader", "name email");
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// GET BOOKS BY USER
export const getBooksByUser = async (req, res) => {
  try {
    const books = await Book.find({ uploader: req.params.userId }); // FIXED
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user books" });
  }
};

//Downloade book
export const downloadBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    console.log("📘 BOOK FILE URL:", book.bookFile);

    const response = await axios.get(book.bookFile, {
      responseType: "stream",
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${book.title}.pdf"`
    );

    response.data.pipe(res);
  } catch (err) {
    console.error("🔥 DOWNLOAD ERROR FULL:", err.message);
    res.status(500).json({ message: "Download failed" });
  }
};


// DELETE A BOOK
export const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Authorization check
    if (book.uploader.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }
  
    

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(book.coverImageId);
    await cloudinary.uploader.destroy(book.bookFileId, {
      resource_type: "raw",
    });

    await book.deleteOne();

    res.json({ message: "Book deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: error.message });
  }
};
