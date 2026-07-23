const User = require("../models/User");
const Booking = require("../models/Booking");
const Expert = require("../models/Expert");

// Create user if doesn't exist, otherwise update
const syncUser = async (req, res) => {
  try {
    const { clerkId, name, email, image } = req.body;

    if (!clerkId || !email) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const existingUser = await User.findOne({ clerkId });

    let updateData;

    if (existingUser) {
      updateData = {
        image,
        email,
        lastLogin: new Date(),
      };
    } else {
      updateData = {
        clerkId,
        name,
        email,
        image,
        lastLogin: new Date(),
      };
    }

    const user = await User.findOneAndUpdate({ clerkId }, updateData, {
      upsert: true,
      returnDocument: "after",
      setDefaultsOnInsert: true,
    });

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update user
const updateUser = async (req, res) => {
  try {
    const { name, status } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name,
        status,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Find all bookings of this user
    const bookings = await Booking.find({
      email: user.email,
    });

    // Free expert slots
    for (const booking of bookings) {
      if (booking.status !== "cancelled") {
        await Expert.findOneAndUpdate(
          {
            _id: booking.expertId,
            "availableSlots.date": booking.date,
            "availableSlots.time": booking.timeSlot,
          },
          {
            $set: {
              "availableSlots.$.isBooked": false,
            },
          },
        );
      }
    }

    // Delete all bookings
    await Booking.deleteMany({
      email: user.email,
    });

    // Delete user
    await User.findByIdAndDelete(req.params.id);

    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
    syncUser,
    getUsers,
    updateUser,
    deleteUser,
  
};
