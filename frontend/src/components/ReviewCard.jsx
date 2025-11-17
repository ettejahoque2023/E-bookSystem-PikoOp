import React from "react";
import RatingStars from "./RatingStars";

export default function ReviewCard({ review }) {
  return (
    <div className="review-card">
      <RatingStars value={review.rating} readOnly />

      <p className="comment">"{review.comment}"</p>
      <p className="review-author">
        — {review.user?.name || "User"}
      </p>
    </div>
  );
}
