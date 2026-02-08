import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "mern_images", // your folder in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "gif"], // include gif if needed
  },
});

const upload = multer({ storage });

export default upload;
