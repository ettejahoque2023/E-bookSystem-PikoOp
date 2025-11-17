// src/pages/Home.jsx
import React, { useState } from "react";
import FeaturedBookList from "../components/FeaturedBookList";
import GenreList from "../components/GenreList";

export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState("All");

  // For demo: pass filtering to FeaturedBookList by genre if connected to real API later
  return (
    <>
      <header className="mb-6">
        <div className="bg-indigo-600 rounded-lg p-6 text-white">
          <h1 className="text-2xl md:text-3xl font-bold tagline">Read. Review. Explore.</h1>
          <p className="mt-2 text-sm md:text-base">Discover new books and share your favorites with the world.</p>
        </div>
      </header>

      <GenreList onSelect={(g) => setSelectedGenre(g)} />

      <FeaturedBookList />

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-3">Recommended for you</h2>
        <p className="text-sm text-gray-500">Personalized picks will appear here after login.</p>
      </section>
    </>
  );
}
