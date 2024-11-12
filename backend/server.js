const express = require("express");
const multer = require("multer");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = 5000;

// Set up file storage with multer
const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB file size limit
});

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/yourdb", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  bio: String,
  photo: Buffer, // Store photo as a buffer in MongoDB
});

const User = mongoose.model("User", UserSchema);

// Handle the registration form
app.post("/register", upload.single('photo'), async (req, res) => {
  try {
    const { username, email, pass, bio } = req.body;
    const { file } = req;

    // Check if all required fields are provided
    if (!username || !email || !pass || !bio || !file) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create a new user with the data from the form
    const newUser = new User({
      username,
      email,
      password: pass,
      bio,
      photo: file.buffer, // Store file as buffer in MongoDB
    });

    // Save the user to MongoDB
    await newUser.save();
    res.status(200).json({ message: "Registration successful" });
  } catch (err) {
    res.status(500).json({ message: "Error in registration", error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
