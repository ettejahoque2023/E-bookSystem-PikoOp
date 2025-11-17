// src/components/layout/Navbar.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();


  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Search */}
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2">
             <img src="/logo.png" alt="logo" className="logo"/>

              <span className="font-semibold text-lg po"><h3><b>PikoOp</b></h3></span>
            </Link>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            <div className="hidden md:flex gap-3 items-center">
              <Link to="/" className="text-gray-700 hover:text-indigo-600">Home</Link>
              {user && <Link to="/upload" className="text-gray-700 hover:text-indigo-600">Upload</Link>}
            </div>

            {!user ? (
              <div className="flex items-center gap-2">
                <Link to="/login" className="px-3 py-1.5 border rounded-md text-sm">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-3 py-1.5 bg-indigo-600 text-white rounded-md text-sm"
                >
                  Signup
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/profile" className="flex items-center gap-2">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    alt="avatar"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <span className="hidden md:block font-medium">{user.name}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1.5 border rounded-md text-sm hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded hover:bg-gray-100"
            onClick={() => setOpen(!open)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8h16M4 16h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
