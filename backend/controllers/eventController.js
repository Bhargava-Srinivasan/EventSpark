// controllers/eventController.js
import Event from "../models/Event.js";

export const createEvent = async (req, res) => {
  try {
    const newEvent = new Event({ ...req.body, userId: req.user.id });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserEvents = async (req, res) => {
  try {
    const events = await Event.find({ userId: req.params.id });
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateEvent = async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
