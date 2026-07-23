const express = require("express");
const {
    syncUser,
    getUsers,
    updateUser,
    deleteUser,
  
} = require("../controllers/userController");

const router = express.Router();

router.post("/sync", syncUser);

router.get("/", getUsers);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;
