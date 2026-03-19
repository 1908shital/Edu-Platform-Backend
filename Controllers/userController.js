const User = require("../models/User");

// GET ALL USERS
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET SINGLE USER
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE USER
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        }).select("-password");

        // Agar user nahi mila
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // Success response
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message,
        });
    }
};

// DELETE USER
exports.deleteUser = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
