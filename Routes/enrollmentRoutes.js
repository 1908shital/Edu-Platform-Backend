const express = require("express");
const router = express.Router();
const auth = require("../Middleware/authMiddleware");
const {
    enrollCourse,
    getEnrollments,
    getTeacherEnrollments,
} = require("../Controllers/enrollmentController.js");

// Student enroll in course
router.post("/", auth, enrollCourse);

// Get student enrollments
router.get("/", auth, getEnrollments);

// Get students enrolled in teacher courses
router.get("/teacher/:teacherId", getTeacherEnrollments);

module.exports = router;
