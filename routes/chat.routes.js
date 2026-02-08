import express from "express";
import ChatMessage from "../models/ChatMessage.js";

const router = express.Router();

/**
 * GET /api/chat
 * Fetch all global chat messages
 */
router.get("/", async (req, res) => {
  try {
    const messages = await ChatMessage.find()
      .sort({ createdAt: 1 }) // oldest → newest
      .limit(500); // safety limit

    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
});

export default router;
