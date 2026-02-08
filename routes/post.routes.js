import express from "express";
import protect from "../middleware/auth.middleware.js";
import {
  createPost,
  getPosts,
  deletePost,
  updatePost,
} from "../controllers/post.controller.js";

const router = express.Router();

router.post("/", protect, createPost);
router.get("/", protect, getPosts);
router.delete("/:id", protect, deletePost);
router.put("/:id", protect, updatePost);

export default router;
