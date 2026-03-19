require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./Routes/authRoutes");
const courseRoutes = require("./Routes/courseRoutes");
const enrollmentRoutes = require("./Routes/enrollmentRoutes");
const reviewRoutes = require("./Routes/reviewRoutes");
const userRoutes = require("./Routes/userRoutes");

const app = express();

// Connect Database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("Backend running successfully ");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/reviews", reviewRoutes);

// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
