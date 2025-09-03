// models/Event.js
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: String,
  category: String,
  description: String,
  image: String,
  date: String,
  location: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // associate with user
});

export default mongoose.model("Event", eventSchema);
