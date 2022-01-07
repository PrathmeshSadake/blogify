const router = require("express").Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.status(200).json({
      success: true,
      message: "User successfully created!",
      user: user._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).send("Wrong credentials!");
    const validate = await bcrypt.compare(password, user.password);
    if (!validate) return res.status(400).send("Wrong credentials!");
    res.status(200).json({
      success: true,
      message: "User successfully logged in!",
      user: user._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
