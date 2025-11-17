import React from "react";

export default function RatingStars({ value, onChange, readOnly }) {
  const stars = [1, 2, 3, 4, 5];

  function handleClick(star) {
    if (readOnly) return;
    if (onChange) onChange(star);
  }

  return (
    <div className="rating-stars">
      {stars.map((star) => (
        <span
          key={star}
          className={star <= value ? "star filled" : "star"}
          onClick={() => handleClick(star)}
        >
          ★
        </span>
      ))}
    </div>
  );
}
