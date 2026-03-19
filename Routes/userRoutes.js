const express = require("express");
const router = express.Router();
const User = require("../models/User");

const {
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
} = require("../Controllers/userController");

// Get all users
router.get("/", getUsers);

// Get user by ID
router.get("/:id", getUserById);

// Update user
router.put("/:id", updateUser);

// Delete user
router.delete("/:id", deleteUser);

module.exports = router;
