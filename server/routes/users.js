const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");

const bcrypt = require("bcryptjs");

router.put("/:id", async (req, res) => {
  if (req.params.id === req.body.userId) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req,
        pasrams.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).send(updatedUser._id);
    } catch (error) {
      res.status(200).json({ error });
    }
  } else {
    res.status(401).send("Unauthorised");
  }
});

router.delete("/:id", async (req, res) => {
  if (req.params.id === req.body.userId) {
    try {
      const user = await User.findById(req.params.id);
      await Post.deleteMany({ username: user.username });
      await User.findByIdAndDelete(req.params.id);
      res.status(200).send("user has been deleted");
    } catch (error) {
      res.status(200).json({ error });
    }
  } else {
    res.status(401).send("Unauthorised");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...otherFields } = user._doc;
    res.status(200).json(otherFields);
  } catch (error) {
    res.status(404).send("User not found!");
  }
});
module.exports = router;
