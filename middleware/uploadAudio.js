import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "voice-notes",
    resource_type: "video", // 👈 REQUIRED for audio
    format: "webm",
  },
});

const uploadAudio = multer({ storage });

export default uploadAudio;
