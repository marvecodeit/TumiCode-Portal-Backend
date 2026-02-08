import express from "express";
import upload from "../middleware/upload.js";
import uploadAudio from "../middleware/uploadAudio.js";
const router = express.Router();

router.post("/image", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    // Cloudinary returns the URL in req.file.path
    return res.status(200).json({ imageUrl: req.file.path });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});
// AUDIO ✅
router.post("/audio", uploadAudio.single("audio"), (req, res) => {
  return res.json({ audioUrl: req.file.path });
});


export default router;
