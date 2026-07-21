const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  getAllBookings,
  getAllExperts,
  createExpert,
  updateExpert,
  deleteExpert,
} = require("../controllers/adminController");

const { updateBookingStatus } = require("../controllers/bookingController");

router.get("/dashboard", getDashboardStats);
router.get("/bookings", getAllBookings);
router.get("/experts", getAllExperts);

router.post("/experts", createExpert);
router.put("/experts/:id", updateExpert);
router.delete("/experts/:id", deleteExpert);

router.patch("/bookings/:id/status", updateBookingStatus);

module.exports = router;
