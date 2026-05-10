const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { authenticate, isSeller } = require("../middleware/authMiddleware");

router.get("/stats", authenticate, isSeller, adminController.getDashboardStats);
router.get("/orders", authenticate, isSeller, adminController.getAllOrders);
router.get("/customers", authenticate, isSeller, adminController.getAllCustomers);

module.exports = router;
