const express = require("express");
const router = express.Router();

const { prepareSession } = require("../controllers/aiPreparationController");

router.post("/prepare", prepareSession);

module.exports = router;
