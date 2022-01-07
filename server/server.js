const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoute = require("./routes/auth");
const usersRoute = require("./routes/users");
const postsRoute = require("./routes/posts");
const categoriesRoute = require("./routes/categories");

const app = express();
const db = process.env.MONGO_URI;
mongoose
  .connect(db)
  .then(() => console.log("💻 Mondodb Connected"))
  .catch((err) => console.error(err));

app.get("/", (req, res) => {
  res.send("Server working 🔥");
});

app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/categories", postsRoute);
app.use("/api/posts", categoriesRoute);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port} 🔥`));
