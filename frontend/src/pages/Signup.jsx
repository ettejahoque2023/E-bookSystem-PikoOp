import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/api";
import Select from "react-select";


export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    interest: [],
  });

  const [loading, setLoading] = useState(false);

  // Options for dropdown
  const interests = [
    { value: "Technology", label: "Technology" },
    { value: "Science", label: "Science" },
    { value: "Fiction", label: "Fiction" },
    { value: "Education", label: "Education" },
    { value: "Biography", label: "Biography" },
    { value: "Self-help", label: "Self-help" },
    { value: "Romance", label: "Romance" },
    { value: "Adventure", label: "Adventure" },
  ];




  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle react-select multiple selection
  const handleInterestChange = (selectedOptions) => {
    const selectedValues = selectedOptions.map((option) => option.value);
    setFormData({ ...formData, interest: selectedValues });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      setLoading(true)
      const res = await API.post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        interest: formData.interest,
      });

      alert(res.data.message || "Signup successful!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Signup failed!");
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
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">Create Account</h2>

        {/* User --name */}
        <div className="mb-4">
          <label className="block text-sm mb-1 font-medium">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-300 outline-none"
          />
        </div>
        {/* User email */}
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

        {/* Interests (React Select) */}
        <div className="mb-4">
          <label className="block text-sm mb-1 font-medium">Select Interests</label>
          <Select
            options={interests}
            isMulti
            name="interest"
            onChange={handleInterestChange}
            className="basic-multi-select"
            classNamePrefix="select"
            placeholder="Choose your interests..."
            styles={{
              control: (base) => ({
                ...base,
                borderColor: "#cbd5e1",
                boxShadow: "none",
                "&:hover": { borderColor: "#6366f1" },
              }),
              multiValue: (base) => ({
                ...base,
                backgroundColor: "#6366f1",
                color: "white",
              }),
              multiValueLabel: (base) => ({
                ...base,
                color: "white",
              }),
              multiValueRemove: (base) => ({
                ...base,
                color: "white",
                ":hover": {
                  backgroundColor: "#4f46e5",
                  color: "white",
                },
              }),
            }}
          />
        </div>

        {/* User Password */}

        <div className="mb-4">
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

        {/* User Password--confirmed */}
        <div className="mb-6">
          <label className="block text-sm mb-1 font-medium">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
            required
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-indigo-300 outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 transition"
        >
          Sign Up
        </button>

        <p className="text-sm text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
