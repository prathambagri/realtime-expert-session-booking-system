const User = require("../models/User");
const { createClerkClient } = require("@clerk/backend");

const clerkClient = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

exports.getAdmins = async (req, res) => {
  try {
    const { page = 1, limit = 6, search, status } = req.query;

    const filter = {
      role: "admin",
    };

    // Search by name or email
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    // Status filter
    if (status) {
      filter.status = status;
    }

    const total = await User.countDocuments(filter);

    const admins = await User.find(filter)
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit));

    res.json({
      admins,
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

exports.updateAdmin = async (req, res) => {
  try {
    const { name, status } = req.body;

    const admin = await User.findOneAndUpdate(
      {
        _id: req.params.id,
        role: "admin",
      },
      {
        name,
        status,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    res.json({
      success: true,
      admin,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.createAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Check if admin already exists in MongoDB
    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists",
      });
    }

    // Create Clerk user
    const username = `${email.split("@")[0]}_${Date.now()}`;

    const clerkUser = await clerkClient.users.createUser({
      emailAddress: [email],
      password,
      username,
      firstName: name,
      publicMetadata: {
        role: "admin",
      },
    });

    // Save in MongoDB
    const admin = await User.create({
      clerkId: clerkUser.id,
      name,
      email,
      image: clerkUser.imageUrl,
      role: "admin",
      status: "Active",
      lastLogin: null,
    });

    return res.status(201).json({
      success: true,
      admin,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.errors?.[0]?.message || error.message,
    });
  }
};

exports.deleteAdmin = async (req, res) => {
  try {
    const admin = await User.findOne({
      _id: req.params.id,
      role: "admin",
    });

    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Admin deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
