import express from 'express';
import { createUserByAdmin, getAllUsers } from '../controllers/admin.controllers.js';
import {isAdmin } from '../middleware/isAdmin.js';
import { protect } from '../middleware/auth.middleware.js';
import { adminOnly } from '../middleware/admin.middleware.js';
import User from '../models/Users.js';
const router = express.Router();


// GET ALL USERS
router.get("/users", protect, adminOnly, async (req, res) => {
  const users = await User.find({ role: "user" }).select("-password");
  res.json(users);
});
// CREATE USER
router.post("/create-user", protect, adminOnly, async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const bcrypt = (await import("bcryptjs")).default;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: "user",
  });

  res.status(201).json(user);
});

export default router;