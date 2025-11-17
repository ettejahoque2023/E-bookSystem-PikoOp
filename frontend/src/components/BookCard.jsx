import React from "react";
import { Link } from "react-router-dom";

export default function BookCard({ book }) {
  return (
    <Link to={`/books/${book._id}`}>
      <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-lg transition transform hover:-translate-y-1 cursor-pointer">
        <img
          src={`http://localhost:5000/${book.coverImage}`}
          alt={book.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-3">
          <h3 className="font-semibold text-sm md:text-base">{book.title}</h3>
          <p className="text-xs text-gray-500">{book.author}</p>

          <div className="mt-2 flex items-center justify-between">
            <span className="text-xs px-2 py-1 bg-indigo-50 text-indigo-600 rounded">
              {book.genre}
            </span>

            <div className="text-sm text-yellow-500">
              {"★".repeat(Math.round(book.rating))}
              <span className="text-gray-400 text-xs">({book.rating})</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
