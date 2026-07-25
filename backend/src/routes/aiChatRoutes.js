const express = require("express");
const { askFollowUpQuestion } = require("../controllers/aiChatController");

const router = express.Router();

router.post("/chat", askFollowUpQuestion);

module.exports = router;
