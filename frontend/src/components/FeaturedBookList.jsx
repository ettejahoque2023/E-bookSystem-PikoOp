// src/components/FeaturedBookList.jsx
import React, { useEffect, useState } from "react";
import BookCard from "./BookCard";
import API from "../utils/api";



export default function FeaturedBookList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await API.get("/books");
        setBooks(res.data); // assuming backend returns array of books
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);
  if (loading) return <p>Loading books...</p>;

  return (
    <section className="my-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Featured Books</h2>
        <a href="#" className="text-indigo-600 text-sm">See all</a>
      </div>
      {books.length === 0 ? (
        <p>No books found yet. Be the first to upload!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {books.map((book) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      )}
    </section>
  );
}
