const express = require("express");
const router = express.Router();
const { getHealthStatus } = require("../controllers/healthController");
const productRoutes = require("./productRoutes");
const authRoutes = require("./authRoutes");
const adminRoutes = require("./adminRoutes");

// Health check route
router.get("/health", getHealthStatus);

// Auth routes
router.use("/auth", authRoutes);

// Product routes
router.use("/products", productRoutes);

// Admin routes
router.use("/admin", adminRoutes);

// Future feature routes will be mounted here:
// const userRoutes = require("./userRoutes");
// router.use("/users", userRoutes);

module.exports = router;
