// backend/server.js
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const admin = require("firebase-admin");
const bcrypt = require("bcrypt");
const app = express();
const path = require("path");
const nodemailer = require("nodemailer");
// const fetch = require("node-fetch");

app.use(cors());
app.use(express.json({ limit: "200mb" }));

// Firebase Admin SDK Initialization
const serviceAccount = require(path.join(__dirname, "firebaseServiceAccountKey.json"));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,         
    pass: process.env.EMAIL_PASS,         
  },
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
      const dummyPassword = await bcrypt.hash(uid, 10); 
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


// All about events
const eventSchema = new mongoose.Schema({
  title: String,
  category: String,
  description: String,
  image: String,
  date: String,
  location: String,
  capacity: String,
  creatorEmail: String,
  attendees: {
    type: [String], 
    default: []     
  }
});

const Event = mongoose.model("Event", eventSchema, "Events");

// Get All Events
app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (err) {
    console.error("❌ Error fetching events:", err);
    res.status(500).json({ error: "Failed to fetch events" });
  }
});

// Add Event
// app.post("/api/events", async (req, res) => {
//   try {
//     const newEvent = new Event(req.body);
//     const savedEvent = await newEvent.save();
//     res.status(201).json(savedEvent);
//   } catch (err) {
//     console.error("❌ Error adding event:", err);
//     res.status(500).json({ error: "Failed to add event" });
//   }
// });

app.post("/api/events", async (req, res) => {
  try {
    const { title, category, description, image, date, location, capacity, creatorEmail } = req.body;

    const newEvent = new Event({
      title,
      category,
      description,
      image,
      date,
      location,
      capacity,
      creatorEmail // ✅ Save email of creator
    });

    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (err) {
    console.error("❌ Error adding event:", err);
    res.status(500).json({ error: "Failed to add event" });
  }
});

// Update Event
app.put("/api/events/:id", async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json({ error: "Failed to update event" });
  }
});


// Delete Event
app.delete("/api/events/:id", async (req, res) => {
  const { id } = req.params;
  const { email } = req.body;

  try {
    const event = await Event.findById(id);

    if (!event) return res.status(404).json({ error: "Event not found" });
    if (event.creatorEmail !== email) return res.status(403).json({ error: "Unauthorized" });

    await Event.findByIdAndDelete(id);
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error("❌ Error deleting event:", err);
    res.status(500).json({ error: "Failed to delete event" });
  }
});

//Register for event
// POST /api/events/:id/register
// app.post("/api/events/:id/register", async (req, res) => {
//   const { email } = req.body;
//   const { id } = req.params;

//   if (!email) return res.status(400).json({ error: "Email is required." });

//   try {
//     const event = await Event.findById(id);
//     if (!event) return res.status(404).json({ error: "Event not found." });

//     if (event.attendees.includes(email)) {
//       return res.status(400).json({ error: "User already registered." });
//     }

//     event.attendees.push(email);
//     await event.save();

//     res.json(event);
//   } catch (err) {
//     res.status(500).json({ error: "Server error." });
//   }
// });

app.post("/api/events/:id/register", async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;

  if (!email) return res.status(400).json({ error: "Email is required." });

  try {
    const event = await Event.findById(id);
    if (!event) return res.status(404).json({ error: "Event not found." });

    if (event.attendees.includes(email)) {
      return res.status(400).json({ error: "User already registered." });
    }

    event.attendees.push(email);
    await event.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `You're Registered for ${event.title}!`,
      html: `<h3>Hi!</h3><p>You're successfully registered for <b>${event.title}</b> on ${event.date}.</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.json(event);
  } catch (err) {
    console.error("Email error:", err.message);
    res.status(500).json({ error: "Server error." });
  }
});


//image generation

// app.post("/generate-image", async (req, res) => {
//   const { prompt } = req.body;

//   if (!prompt) return res.status(400).json({ error: "Prompt is required" });

//   try {
//     const response = await fetch("https://api.openai.com/v1/images/generations", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//       },
//       body: JSON.stringify({
//         prompt,
//         n: 1,
//         size: "512x512",
//         response_format: "b64_json"
//       }),
//     });

//     const data = await response.json();

//     // Log the response for debugging
//     console.log("OpenAI image generation response:", data);

//     if (!data || !Array.isArray(data.data) || !data.data[0]?.b64_json) {
//       return res.status(500).json({ error: "Image generation failed. No image returned." });
//     }

//     const base64Image = `data:image/png;base64,${data.data[0].b64_json}`;
//     res.json({ image: base64Image });
//   } catch (error) {
//     console.error("AI Image generation failed:", error.message);
//     res.status(500).json({ error: "Failed to generate image" });
//   }
// });

app.post("/generate-image", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Authorization": `Token ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        version: "db21e45c3704cd3c3e5a5d3fb905176d0e50d37a9f09c72d76d2c8e63f5e0e9b", // SDXL 1.0
        input: {
          prompt: prompt,
          width: 512,
          height: 512
        }
      })
    });

    const prediction = await response.json();

    if (prediction.error) {
      console.error("Replicate error:", prediction.error);
      return res.status(500).json({ error: prediction.error });
    }

    const getImageUrl = async () => {
      let status;
      let result;
      do {
        const check = await fetch(`https://api.replicate.com/v1/predictions/${prediction.id}`, {
          headers: {
            "Authorization": `Token ${process.env.REPLICATE_API_TOKEN}`
          }
        });
        result = await check.json();
        status = result.status;
        await new Promise(r => setTimeout(r, 1000)); // wait 1s between polls
      } while (status !== "succeeded" && status !== "failed");

      if (status === "succeeded") {
        return result.output[0];
      } else {
        throw new Error("Image generation failed");
      }
    };

    const imageUrl = await getImageUrl();
    res.json({ image: imageUrl });

  } catch (error) {
    console.error("Image generation failed:", error.message);
    res.status(500).json({ error: "Failed to generate image" });
  }
});


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
