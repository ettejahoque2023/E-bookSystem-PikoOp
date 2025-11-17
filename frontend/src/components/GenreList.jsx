// src/components/GenreList.jsx
import React from "react";

const genres = ["All", "Fiction", "Education", "Mystery", "Romance", "Sci-Fi", "Biography", "Horror"];

export default function GenreList({ onSelect }) {
  return (
    <section className="my-6">
      <h3 className="text-lg font-medium mb-3">Genres</h3>
      <div className="flex gap-2 overflow-x-auto pb-2">
        {genres.map((g) => (
          <button
            key={g}
            onClick={() => onSelect?.(g)}
            className="whitespace-nowrap px-4 py-2 rounded-full border border-gray-200 text-sm bg-white hover:bg-indigo-50"
          >
            {g}
          </button>
        ))}
      </div>
    </section>
  );
}
