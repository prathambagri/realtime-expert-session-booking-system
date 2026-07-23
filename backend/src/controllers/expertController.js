const Expert = require("../models/Expert");

exports.getExperts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 6,
      category,
      search,
      experience,
      status,
    } = req.query;

    const filter = {};

    // Search by name
    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    // Category filter
    if (category && category !== "All") {
      filter.category = category;
    }

    // Minimum experience
    if (experience) {
      filter.experience = {
        $gte: Number(experience),
      };
    }

    // Fetch experts with slots
    let experts = await Expert.find(filter);

    // Status filter
    if (status && status !== "All") {
      experts = experts.filter((expert) => {
        const hasAvailableSlot = expert.availableSlots.some(
          (slot) => !slot.isBooked,
        );

        if (status === "Available") {
          return hasAvailableSlot;
        }

        if (status === "Fully Booked") {
          return !hasAvailableSlot;
        }

        return true;
      });
    }

    const total = experts.length;

    const paginatedExperts = experts
      .slice((page - 1) * limit, page * limit)
      .map((expert) => ({
        _id: expert._id,
        name: expert.name,
        category: expert.category,
        experience: expert.experience,
        rating: expert.rating,
        bio: expert.bio,
        createdAt: expert.createdAt,
        updatedAt: expert.updatedAt,
      }));

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

exports.getExpertById = async (req, res) => {
  try {
    const expert = await Expert.findById(req.params.id);
    if (!expert) return res.status(404).json({ error: "Expert not found" });
    res.json(expert);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
