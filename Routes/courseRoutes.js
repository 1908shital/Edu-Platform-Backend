const express = require("express");
const router = express.Router();

const auth = require("../Middleware/authMiddleware");

const {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse
} = require("../Controllers/courseController");


// CREATE COURSE
router.post("/", auth, createCourse);


// GET ALL COURSES
router.get("/", getAllCourses);


// GET COURSE BY ID
router.get("/:id", getCourseById);


// UPDATE COURSE
router.put("/:id", auth, updateCourse);


// DELETE COURSE
router.delete("/:id", auth, deleteCourse);


module.exports = router;