import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Book title is required"],
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
    },
    description: {
      type: String,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
  
    coverImage: {
      type: String, // Path or URL
      required: true,
    },
    bookFile: {
      type: String, // PDF file path or URL
      required: true,
    },
    uploader: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true 
      
    },
    averageRating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);
export default Book;
