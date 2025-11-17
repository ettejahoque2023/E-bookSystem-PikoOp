import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReviewSection from "../components/ReviewSection";
import "../App.css";

export default function BookDetails() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBook() {
      try {
        const res = await axios.get(`/api/books/${id}`);
        setBook(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
    fetchBook();
  }, [id]);

  if (loading) return <h2>Loading...</h2>;

  if (!book) return <h2>Book Not Found</h2>;

  return (
    <div className="book-details-container">
      <div className="book-details">
        <img
          src={`http://localhost:5000/${book.coverImage}`}
          alt={book.title}
          className="book-details-cover"
        />

        <div className="book-info">
          <h1>{book.title}</h1>
          <h3>by {book.author}</h3>
          <p><strong>Genre:</strong> {book.genre}</p>

          <p className="description">
            {book.description || "No description available."}
          </p>

          {book.bookFile && (
            <a
               href={`http://localhost:5000/${book.bookFile}`}
              download
              className="btn download-btn"
            >
              Download Book
            </a>
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <ReviewSection bookId={id} />
    </div>
  );
}
