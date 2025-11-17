import React, { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import API from "../utils/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user } = useAuth(); // get logged-in user from context
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?._id) return; // only fetch when user is available
    const fetchUserBooks = async () => {
      try {
        const res = await API.get(`/books/user/${user._id}`);
        setBooks(res.data);
      } catch (err) {
        console.error("Error fetching user books:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUserBooks();
  }, [user]);

  if (!user)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-gray-600">
          Please login to view your profile.
        </p>
      </div>
    );

  return (
    <div className="min-h-[70vh]">
      {/* --- Profile Header --- */}
      <section className="bg-white rounded-lg shadow p-6 md:p-8 flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
        <img
          src={
            user.profileImage ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt="Profile"
          className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
        />

        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-gray-600 mt-2">
            {user.interest?.length > 0 ? (
              <span>
                Interests:{" "}
                <span className="text-indigo-600 font-medium">
                  {user.interest.join(", ")}
                </span>
              </span>
            ) : (
              "No interests added yet 📚"
            )}
          </p>



          <button
            onClick={() => navigate("/upload")}
            className="mt-6 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Upload Book
          </button>

        </div>
      </section>

      {/* --- Uploaded Books --- */}
      <section>
        <h3 className="text-xl font-semibold mb-4">My Uploaded Books</h3>

        {loading ? (
          <p>Loading your books...</p>
        ) : books.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            You haven’t uploaded any books yet.
          </p>
        )}
      </section>
    </div>
  );
}
