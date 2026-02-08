import Post from "../models/Post.js";

/**
 * GET ALL POSTS
 */
export const getPosts = async (req, res) => {
  const posts = await Post.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.json(posts);
};

/**
 * CREATE POST (REAL-TIME)
 */
export const createPost = async (req, res) => {
  try {
    const io = req.app.get("io");

    const { text, image } = req.body;

    const post = await Post.create({
      text,
      image: image || "", // ✅ FIX
      user: req.user.id,
       audio: req.body.audio || "",
    });

    const populatedPost = await post.populate("user", "name email");

    // 🔥 Emit post WITH image
    io.emit("post:new", populatedPost);

    res.status(201).json(populatedPost);
  } catch (err) {
    console.error("Create post error:", err);
    res.status(500).json({ message: "Failed to create post" });
  }
};

/**
 * DELETE POST (REAL-TIME)
 */
export const deletePost = async (req, res) => {
  const io = req.app.get("io");

  const post = await Post.findById(req.params.id);

  if (!post)
    return res.status(404).json({ message: "Post not found" });

  if (post.user.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not authorized" });
  }

  await post.deleteOne();

  // 🔥 Emit delete event
  io.emit("post:delete", post._id);

  res.json({ message: "Post deleted" });
};

/**
 * UPDATE POST (REAL-TIME)
 */
export const updatePost = async (req, res) => {
  const io = req.app.get("io");

  const post = await Post.findById(req.params.id);

  if (!post)
    return res.status(404).json({ message: "Post not found" });

  if (post.user.toString() !== req.user.id) {
    return res.status(403).json({ message: "Not authorized" });
  }

  post.text = req.body.text || post.text;
  await post.save();

  const updatedPost = await post.populate(
    "user",
    "name email"
  );

  // 🔥 Emit update event
  io.emit("post:update", updatedPost);

  res.json(updatedPost);
};
