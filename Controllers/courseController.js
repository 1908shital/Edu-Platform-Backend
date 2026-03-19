const Course = require("../models/Course");

// CREATE COURSE
exports.createCourse = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);

        // Check role
        if (!user || user.role !== "teacher") {
            return res.status(403).json({
                message: "Only teachers can create courses",
            });
        }
        const course = await Course.create({
            ...req.body,
            teacher: req.user.id,
        });

        res.status(201).json({
            message: "Course created successfully",
            course,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET ALL COURSES + FILTER
exports.getAllCourses = async (req, res) => {
    try {
        const { category, level, duration } = req.query;

        let filter = {};

        if (category) {
            filter.category = category;
        }

        if (level) {
            filter.level = level;
        }

        if (duration) {
            filter.duration = duration;
        }

        const courses = await Course.find(filter).populate(
            "teacher",
            "firstName lastName email profilePicture expertise",
        );

        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET COURSE BY ID
exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate(
            "teacher",
            "firstName lastName email profilePicture expertise experience",
        );

        if (!course) {
            return res.status(404).json({
                message: "Course not found",
            });
        }

        res.json(course);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// UPDATE COURSE
exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({
                message: "Course not found",
            });
        }

        // Check if logged in teacher owns the course
        // if (course.teacher.toString() !== req.user.id) {
        //     return res.status(403).json({
        //         message: "You can update only your courses",
        //     });
        // }

        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true },
        );

        res.json({
            message: "Course updated",
            course: updatedCourse,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// DELETE COURSE
exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.json({
            message: "Course deleted successfully",
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
