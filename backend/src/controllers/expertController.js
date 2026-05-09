const Expert = require("../models/Expert");

exports.getExperts = async (req, res) => {
  try {
    const { page = 1, limit = 6, category, search } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (search) filter.name = { $regex: search, $options: "i" };

    const total = await Expert.countDocuments(filter);
    const experts = await Expert.find(filter)
      .select("-availableSlots") // don't send slots, saves data
      .skip((page - 1) * limit) // skip previous pages
      .limit(Number(limit)); // only return 6 per page

    res.json({
      experts,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
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
