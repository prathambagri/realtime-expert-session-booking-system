const Booking = require("../models/Booking");
const Expert = require("../models/Expert");

exports.getDashboardStats = async (req, res) => {
  try {
    const [
      totalExperts,
      totalBookings,
      pending,
      confirmed,
      completed,
      cancelled,
    ] = await Promise.all([
      Expert.countDocuments(),
      Booking.countDocuments(),
      Booking.countDocuments({ status: "pending" }),
      Booking.countDocuments({ status: "confirmed" }),
      Booking.countDocuments({ status: "completed" }),
      Booking.countDocuments({ status: "cancelled" }),
    ]);

    res.json({
      totalExperts,
      totalBookings,
      pending,
      confirmed,
      completed,
      cancelled,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("expertId", "name category")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllExperts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 6,
      search,
      category,
      experience,
      status,
    } = req.query;

    const filter = {};

    // Search
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    // Category
    if (category && category !== "All") {
      filter.category = category;
    }

    // Minimum experience
    if (experience) {
      filter.experience = {
        $gte: Number(experience),
      };
    }

    let experts = await Expert.find(filter).sort({
      createdAt: -1,
    });

    // Status filter
    if (status && status !== "All") {
      experts = experts.filter((expert) => {
        const hasAvailableSlot = expert.availableSlots.some(
          (slot) => !slot.isBooked
        );

        return status === "Available"
          ? hasAvailableSlot
          : !hasAvailableSlot;
      });
    }

    const total = experts.length;

    const paginatedExperts = experts.slice(
      (Number(page) - 1) * Number(limit),
      Number(page) * Number(limit)
    );

    res.json({
      experts: paginatedExperts,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / Number(limit)),
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

exports.createExpert = async (req, res) => {
  try {
    const { name, category, experience, rating, bio, availableSlots } =
      req.body;

    if (!name || !category || !experience || !bio) {
      return res.status(400).json({
        error: "Name, category, experience and bio are required",
      });
    }

    const expert = await Expert.create({
      name,
      category,
      experience,
      rating: rating || 0,
      bio,
      availableSlots: availableSlots || [],
    });

    res.status(201).json(expert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateExpert = async (req, res) => {
  try {
    const { name, category, experience, rating, bio, availableSlots } =
      req.body;

    const expert = await Expert.findByIdAndUpdate(
      req.params.id,
      {
        name,
        category,
        experience,
        rating,
        bio,
        availableSlots,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!expert) {
      return res.status(404).json({
        error: "Expert not found",
      });
    }

    res.json(expert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteExpert = async (req, res) => {
  try {
    const expert = await Expert.findByIdAndDelete(req.params.id);

    if (!expert) {
      return res.status(404).json({
        error: "Expert not found",
      });
    }

    res.json({
      message: "Expert deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};