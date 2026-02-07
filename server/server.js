require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const urlRoutes = require("./routes/url");

const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/linksnap";

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => {
  res.json({ message: "LinkSnap API is running" });
});

app.use("/api/url", urlRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
