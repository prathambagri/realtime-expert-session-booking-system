
const Booking = require("../models/Booking");
const Expert = require("../models/Expert");
const { emitSlotBooked } = require("../socket");

exports.createBooking = async (req, res) => {
  try {
    const { expertId, name, email, phone, date, timeSlot, notes } = req.body;

    if (!expertId || !name || !email || !phone || !date || !timeSlot) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // atomic update — prevents double booking
    const updated = await Expert.findOneAndUpdate(
      {
        _id: expertId,
        "availableSlots.date": date,
        "availableSlots.time": timeSlot,
        "availableSlots.isBooked": false,
      },
      { $set: { "availableSlots.$.isBooked": true } },
      { new: true },
    );

    if (!updated) {
      return res
        .status(409)
        .json({ error: "Slot already booked or not available" });
    }

    const booking = await Booking.create({
      expertId,
      name,
      email,
      phone,
      date,
      timeSlot,
      notes,
    });

    emitSlotBooked(expertId, date, timeSlot);

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["pending", "confirmed", "completed"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getBookingsByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.status(400).json({ error: "Email is required" });
    const bookings = await Booking.find({ email }).populate(
      "expertId",
      "name category",
    );
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
