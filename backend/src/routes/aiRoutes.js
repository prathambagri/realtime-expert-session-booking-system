const express = require("express");
const router = express.Router();

const { recommendExpert } = require("../controllers/aiController");

router.post("/recommend", recommendExpert);

module.exports = router;
