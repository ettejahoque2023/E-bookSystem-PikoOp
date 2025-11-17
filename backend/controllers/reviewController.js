import asyncHandler from "express-async-handler";
import Review from "../models/reviewModel.js";
import Book from "../models/bookModel.js";

// @desc Add review for a book
// @route POST /api/reviews/:bookId
// @access Private
export const addReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const bookId = req.params.bookId;

  const book = await Book.findById(bookId);

  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }

  // Prevent duplicate reviews
  const alreadyReviewed = await Review.findOne({
    book: bookId,
    user: req.user._id,
  });

  if (alreadyReviewed) {
    res.status(400);
    throw new Error("You have already reviewed this book");
  }

  // Validate rating
  if (!rating || rating < 1 || rating > 5) {
    res.status(400);
    throw new Error("Rating must be between 1 and 5");
  }

  // Create new review
  const review = await Review.create({
    book: bookId,
    user: req.user._id,
    rating,
    comment,
  });

  // Update average rating
  const reviews = await Review.find({ book: bookId });

  const avg =
    reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;

  book.averageRating = Number(avg.toFixed(1));
  await book.save();

  res.status(201).json({
    message: "Review added successfully",
    review,
  });
});

// @desc Get reviews for a book
// @route GET /api/reviews/:bookId
// @access Public
export const getReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({ book: req.params.bookId })
    .populate("user", "name");

  res.json(reviews);
});
