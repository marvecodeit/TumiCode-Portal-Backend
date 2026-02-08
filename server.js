import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./config/Connect.js";
import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import postRoutes from "./routes/post.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import uploadRoute from "./routes/upload.js";

dotenv.config();

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(express.json());
app.use(cors({ origin: ["https://portal-tumicodes.vercel.app/"], credentials: true }));

/* ================= ROUTES ================= */
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/upload", uploadRoute); // Upload route

/* ================= HTTP + SOCKET SERVER ================= */
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: "https://portal-tumicodes.vercel.app/", methods: ["GET", "POST"], credentials: true },
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log("🟢 User connected:", socket.id);

  socket.join("global-chat");

  socket.on("send-message", async (messageData, callback) => {
    try {
      if (!messageData?.text || !messageData?.senderId) return;

      const savedMessage = await ChatMessage.create({
        senderId: messageData.senderId,
        senderName: messageData.senderName,
        role: messageData.role || "user",
        text: messageData.text,
        image: messageData.image || "", // optional image
      });

      io.to("global-chat").emit("receive-message", savedMessage);
      callback?.({ success: true, message: savedMessage });
    } catch (err) {
      console.error("❌ Message save error:", err);
      callback?.({ success: false });
    }
  });

  socket.on("disconnect", () => {
    console.log("🔴 User disconnected:", socket.id);
  });
});

/* ================= START SERVER ================= */
const PORT = process.env.PORT || 5000;

server.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server running on port ${PORT}`);
});
