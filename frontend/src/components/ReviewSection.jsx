import React, { useEffect, useState } from "react";
import API from "../utils/api";
import ReviewCard from "./ReviewCard";
import RatingStars from "./RatingStars";
import { useAuth } from "../context/AuthContext";


export default function ReviewSection({ bookId }) {
  const [reviews, setReviews] = useState([]);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const [msg, setMsg] = useState("");
  const { user } = useAuth();

  const loadReviews = async () => {
    try {
      const res = await API.get(`/reviews/${bookId}`);
      setReviews(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadReviews();
  }, [bookId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");

    // 🚫 If user not logged in → stop here
    if (!user) {
      return setMsg("Please login to submit a review.");
    }

    if (rating === 0) return setMsg("Please select a rating.");

    try {
      await API.post(`/reviews/${bookId}`, {
        rating,
        comment,
      });

      setComment("");
      setRating(0);
      setMsg("Review added successfully!");

      loadReviews();
    } catch (err) {
      console.error(err);
      setMsg(err.response?.data?.message || "Failed to submit review.");
    }
  };

  return (
    <div className="reviews-container">
      <h2>Reviews</h2>

      <div className="review-form">
        <RatingStars value={rating} onChange={setRating} />

        <textarea
          placeholder="Write your thoughts..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="3"
        ></textarea>

        {msg && <p className="msg">{msg}</p>}

        <button className="btn" onClick={handleSubmit}>
          Submit Review
        </button>
      </div>

      <div className="review-list">
        {reviews.length === 0 && <p>No reviews yet.</p>}
        {reviews.map((rev) => (
          <ReviewCard key={rev._id} review={rev} />
        ))}
      </div>
    </div>
  );
}
