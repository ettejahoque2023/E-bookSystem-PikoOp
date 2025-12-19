// import multer from "multer";
// import { CloudinaryStorage } from "multer-storage-cloudinary";
// import cloudinary from "../config/cloudinary.js";

// // Dynamic Cloudinary storage
// const storage = new CloudinaryStorage({
//   cloudinary,
//   params: (req, file) => {
//     let folder = "ebooks/others";

//     if (file.fieldname === "coverImage") folder = "ebooks/covers";
//     else if (file.fieldname === "bookFile") folder = "ebooks/books";

//     return {
//       folder,
//       resource_type: file.mimetype === "application/pdf" ? "raw" : "image",
//       public_id: `${file.fieldname}-${Date.now()}`,
//     };
//   },
// });

// // File filter (same logic as yours)
// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype.startsWith("image/") ||
//     file.mimetype === "application/pdf"
//   ) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only images and PDFs allowed"), false);
//   }
// };

// export const upload = multer({ storage, fileFilter });



import multer from "multer";

const storage = multer.memoryStorage();

export const upload = multer({ storage });

