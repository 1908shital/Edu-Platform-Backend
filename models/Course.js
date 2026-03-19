const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
    },

    price: {
        type: Number,
        default: 0,
    },

    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },

    level: {
        type: String,
        enum: ["Beginner", "Intermediate", "Advanced"],
        default: "Beginner",
    },

    lessons: {
        type: Number,
        default: 0,
    },

    image: {
        type: String,
    },

    duration: {
        type: String,
    },

    tags: [
        {
            type: String,
        },
    ],

    category: {
        type: String,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Course", courseSchema);
