const express = require("express");
const router = express.Router();
const { getHealthStatus } = require("../controllers/healthController");
const authRoutes = require("./authRoutes");
const productRoutes = require("./productRoutes");
const cartRoutes = require("./cartRoutes");
const orderRoutes = require("./orderRoutes");
const adminRoutes = require("./adminRoutes");

router.get("/health", getHealthStatus);

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/cart", cartRoutes);
router.use("/orders", orderRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
