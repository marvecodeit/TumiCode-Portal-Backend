import mongoose from "mongoose";

const chatMessageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    senderName: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    text: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // ✅ createdAt & updatedAt handled by DB
);

export default mongoose.model("ChatMessage", chatMessageSchema);
