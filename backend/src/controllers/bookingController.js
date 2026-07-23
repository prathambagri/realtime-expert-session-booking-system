
const Booking = require("../models/Booking");
const Expert = require("../models/Expert");
const { emitSlotBooked, emitSlotFreed } = require("../socket");
const {
  sendBookingConfirmation,
  sendBookingCancellation,
} = require("../utils/email");

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

    emitSlotBooked(String(expertId), date, timeSlot);

    await sendBookingConfirmation({
      name,
      email,
      expertName: updated.name,
      date,
      timeSlot,
    });

    res.status(201).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!["pending", "confirmed", "completed", "cancelled"].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    if (!booking) return res.status(404).json({ error: "Booking not found" });

    // if cancelled, free the slot and notify all users
    // if cancelled, free the slot and notify all users
    if (status === "cancelled") {
      await Expert.findOneAndUpdate(
        {
          _id: booking.expertId,
          "availableSlots.date": booking.date,
          "availableSlots.time": booking.timeSlot,
        },
        { $set: { "availableSlots.$.isBooked": false } },
      );

      emitSlotFreed(String(booking.expertId), booking.date, booking.timeSlot);

      const expert = await Expert.findById(booking.expertId);

      await sendBookingCancellation({
        name: booking.name,
        email: booking.email,
        expertName: expert.name,
        date: booking.date,
        timeSlot: booking.timeSlot,
      });
    }

    res.json(booking);
  } catch (err) {
    console.error("Create booking error:", err);
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

