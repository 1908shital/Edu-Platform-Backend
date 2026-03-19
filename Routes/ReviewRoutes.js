const express = require("express");
const router = express.Router();

const auth = require("../Middleware/authMiddleware");

const {
  createReview,
  getAllReviews,
  getReviewsByCourse,
  updateReview,
  deleteReview,
} = require("../Controllers/reviewController.js");


// CREATE REVIEW
router.post("/", auth, createReview);


// GET ALL REVIEWS
router.get("/", getAllReviews);


// GET REVIEWS BY COURSE
router.get("/course/:courseId", getReviewsByCourse);


// UPDATE REVIEW
router.put("/:id", auth, updateReview);


// DELETE REVIEW
router.delete("/:id", auth, deleteReview);


module.exports = router;