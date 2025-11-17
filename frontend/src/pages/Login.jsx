import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/api";
import { useAuth } from "../context/AuthContext";


export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
   const [loading, setLoading] = useState(false);

const { login } = useAuth();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    
     try {
      setLoading(true);
      const res = await API.post("/auth/login", formData);
      const userData = res.data;

      // Store user in localStorage
     login(userData);

      alert("Login successful!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">Login</h2>

        <div className="mb-4">
          <label className="block text-sm mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-300 outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-300 outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4 text-gray-600">
         New in PikoOp?{" "}
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
