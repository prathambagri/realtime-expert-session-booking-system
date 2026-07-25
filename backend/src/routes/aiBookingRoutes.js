const express = require("express");
const router = express.Router();

const {
  improveBookingDescription,
} = require("../controllers/aiBookingController");

router.post("/improve-booking", improveBookingDescription);

module.exports = router;
