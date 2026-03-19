const Review = require("../models/Review");


// CREATE REVIEW
exports.createReview = async (req, res) => {
  try {
    const { course, rating, comment } = req.body;

    const review = await Review.create({
      student: req.user.id,
      course,
      rating,
      comment,
    });

    res.status(201).json({
      message: "Review added successfully",
      review,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// GET ALL REVIEWS
exports.getAllReviews = async (req, res) => {
  try {

    const reviews = await Review.find()
      .populate("student", "firstName lastName")
      .populate("course", "title");

    res.json(reviews);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// GET REVIEWS BY COURSE
exports.getReviewsByCourse = async (req, res) => {
  try {

    const reviews = await Review.find({
      course: req.params.courseId,
    }).populate("student", "firstName lastName");

    res.json(reviews);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// UPDATE REVIEW
exports.updateReview = async (req, res) => {
  try {

    const review = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json({
      message: "Review updated",
      review,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// DELETE REVIEW
exports.deleteReview = async (req, res) => {
  try {

    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json({
      message: "Review deleted successfully",
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};