const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const db = process.env.MONGO_URI;
mongoose
  .connect(db)
  .then(() => console.log("💻 Mondodb Connected"))
  .catch((err) => console.error(err));

const app = express();
app.use(express.json);

const port = process.env.PORT || 8000;
app.listen(port, () => `Server running on port ${port} 🔥`);
