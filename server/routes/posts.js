const router = require("express").Router();
const Post = require("../models/Post");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    if (!posts) return res.status(404).send("Posts not found!");
    res.status(200).json({ results: posts });
  } catch (error) {
    res.status(500).send("Server Error!");
  }
});
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).send("Post not found!");
    res.status(200).send(post);
  } catch (error) {
    res.status(404).send("Post not found!");
  }
});
router.post("/", async (req, res) => {
  const newPost = await Post.create(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).send(savedPost);
  } catch (error) {
    res.status(500).send("Server Error!");
  }
});
router.put("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).send("Post not found!");

  if (post.username === req.body.username) {
    try {
      const updatedPost = await Post.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).send(updatedPost);
    } catch (error) {
      res.status(500).send("Server Error!");
    }
  } else {
    res.status(401).send("Unauthorised");
  }
});
router.delete("/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) return res.status(404).send("Post not found!");

  if (post.username === req.body.username) {
    try {
      await Post.findByIdAndDelete(post_id);
      res.status(200).send("Post Deleted Successfully");
    } catch (error) {
      res.status(500).send("Server Error!");
    }
  } else {
    res.status(401).send("Unauthorised");
  }
});

module.exports = router;
