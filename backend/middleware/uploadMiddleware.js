import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure upload subdirectories exist
const createUploadDirs = () => {
  const baseDir = path.join(process.cwd(), "uploads");
  const subDirs = ["covers", "books","others"];

  if (!fs.existsSync(baseDir)) fs.mkdirSync(baseDir);
  subDirs.forEach((dir) => {
    const fullPath = path.join(baseDir, dir);
    if (!fs.existsSync(fullPath)) fs.mkdirSync(fullPath);
  });
};

createUploadDirs();

// Dynamic storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "uploads/others"; // default fallback
    if (file.fieldname === "coverImage") folder = "uploads/covers";
    else if (file.fieldname === "bookFile") folder = "uploads/books";
    cb(null, folder);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter (optional)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/") || file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only images and PDFs allowed"), false);
  }
};

export const upload = multer({ storage, fileFilter });
