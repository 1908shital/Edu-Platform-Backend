const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");
const User = require("../models/User");

// Enroll Student in Course

exports.enrollCourse = async (req, res) => {
    try {
        const { courseId } = req.body;

        // Get logged in user
        const user = await User.findById(req.user.id);

        // Check role
        if (!user || user.role !== "student") {
            return res.status(403).json({
                message: "Only students can enroll in courses",
            });
        }

        // Check if already enrolled
        const existingEnrollment = await Enrollment.findOne({
            student: req.user.id,
            course: courseId,
        });

        if (existingEnrollment) {
            return res.status(400).json({
                message: "You are already enrolled in this course",
            });
        }

        // Create enrollment
        const enrollment = await Enrollment.create({
            student: req.user.id,
            course: courseId,
        });

        // Populate data
        const populatedEnrollment = await Enrollment.findById(enrollment._id)
            .populate("course")
            .populate("student", "firstName lastName email");

        res.status(201).json({
            message: "Course enrolled successfully",
            enrollment: populatedEnrollment,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};
// Get All Enrollments for Logged-in Student
exports.getEnrollments = async (req, res) => {
    try {
        const enrollments = await Enrollment.find({
            student: req.user.id,
        })
            .populate({
                path: "course",
                select: "title description price teacher level lessons duration category",
            })
            .populate({
                path: "student",
                select: "name email",
            });
        // console.log(enrollments);

        res.status(200).json({
            total: enrollments.length,
            enrollments,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

exports.getTeacherEnrollments = async (req, res) => {
    try {
        const { teacherId } = req.params;

        // Step 1: find all courses of this teacher
        const courses = await Course.find({ teacher: teacherId });

        const courseIds = courses.map((course) => course._id);

        // Step 2: find enrollments of those courses
        const enrollments = await Enrollment.find({
            course: { $in: courseIds },
        })
            .populate("student", "firstName lastName email profilePicture")
            .populate("course", "title");

        res.status(200).json({
            success: true,
            total: enrollments.length,
            enrollments,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching enrollments",
            error: error.message,
        });
    }
};
