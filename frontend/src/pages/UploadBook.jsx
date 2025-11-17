import React, { useState } from "react";
import axios from "axios";
import "../App.css";

export default function UploadBook() {
  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    genre: "",
  });

  const [coverImage, setCoverImage] = useState(null);
  const [bookFile, setBookFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleCover(e) {
    const file = e.target.files[0];
    setCoverImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  }

  function handleBook(e) {
    setBookFile(e.target.files[0]);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");

    if (!form.title || !form.author) {
      return setMsg("Title and Author are required.");
    }
    if (!coverImage || !bookFile) {
      return setMsg("Both Cover Image and Book File must be uploaded.");
    }

    try {
      setLoading(true);

      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("author", form.author);
      fd.append("description", form.description);
      fd.append("genre", form.genre);
      fd.append("coverImage", coverImage);
      fd.append("bookFile", bookFile);

      const res = await axios.post("/api/books/upload", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("user"))?.token,
        },
      });


      setLoading(false);
      setMsg("Book Uploaded Successfully! 🎉");

      setForm({
        title: "",
        author: "",
        description: "",
        genre: "",
      });
      setCoverImage(null);
      setBookFile(null);
      setPreview(null);
    } catch (error) {
      setLoading(false);
      setMsg(error.response?.data?.message || "Upload failed.");
      console.log(error);
    }
  }

  return (
    <div className="upload-container">
      <h1>Upload a New Book</h1>

      <form className="upload-form" onSubmit={handleSubmit}>
        <label>Title *</label>
        <input type="text" name="title" value={form.title} onChange={handleChange} />

        <label>Author *</label>
        <input type="text" name="author" value={form.author} onChange={handleChange} />

        <label>Genre</label>
        <input type="text" name="genre" value={form.genre} onChange={handleChange} />

        <label>Description</label>
        <textarea
          name="description"
          rows="4"
          value={form.description}
          onChange={handleChange}
        ></textarea>

        <label>Cover Image *</label>
        <input type="file" accept="image/*" onChange={handleCover} />

        {preview && (
          <div className="preview-box">
            <img src={preview} alt="Preview" />
          </div>
        )}

        <label>Book File *</label>
        <input type="file" accept=".pdf,.epub" onChange={handleBook} />

        {msg && <p className="msg">{msg}</p>}

        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Uploading..." : "Upload Book"}
        </button>
      </form>
    </div>
  );
}
