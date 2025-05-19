// backend/server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const admin = require("firebase-admin");
const bcrypt = require("bcrypt");
const app = express();
const path = require("path");

app.use(cors());
app.use(express.json());

// Firebase Admin SDK Initialization
const serviceAccount = require(path.join(__dirname, "firebaseServiceAccountKey.json"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// User Schema
const userSchema = new mongoose.Schema({
  uid: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model("User", userSchema, "Login-auth");

// Register Route
app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Registering user:", email);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.warn("User already exists in MongoDB:", email);
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userRecord = await admin.auth().createUser({
      email,
      password,
    });

    console.log("Firebase user created:", userRecord.uid);

    const newUser = new User({
      uid: userRecord.uid,
      email,
      password: hashedPassword
    });

    await newUser.save();
    console.log("User saved to MongoDB:", newUser);

    res.json({ message: "Account created successfully!" });

  } catch (err) {
    console.error("Error in registration:", err);

    if (err.code === "auth/email-already-exists") {
      res.status(400).json({ error: "Email already registered in Firebase" });
    } else if (err.code === 11000) {
      res.status(400).json({ error: "Email already registered in MongoDB" });
    } else {
      res.status(500).json({ error: "Server error" });
    }
  }
});

// Login Route
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Logging in user:", email);

    const user = await User.findOne({ email });
    if (!user) {
      console.warn("User not found in MongoDB:", email);
      return res.status(400).json({ error: "User not found" });
    }

    const userRecord = await admin.auth().getUserByEmail(email);
    console.log("Firebase user found:", userRecord.uid);

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.warn("Invalid password for user:", email);
      return res.status(400).json({ error: "Invalid credentials" });
    }

    res.json({ message: "Login successful", uid: userRecord.uid });

  } catch (err) {
    console.error("Error in login:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ New Route: Google Login
app.post("/api/google-login", async (req, res) => {
  const { uid, email } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      const dummyPassword = await bcrypt.hash(uid, 10); // Google user has no password
      user = new User({
        uid,
        email,
        password: dummyPassword,
      });

      await user.save();
      console.log("Google user saved to MongoDB:", user);
    } else {
      console.log("Google user already exists in MongoDB:", user.email);
    }

    res.json({ message: "Google user processed successfully", uid });

  } catch (err) {
    console.error("Error in Google login:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
