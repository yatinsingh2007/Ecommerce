const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
// In a real app, I'd add an isAdmin/isSeller middleware here
// const { authenticate, authorizeSeller } = require("../middleware/auth");

router.get("/stats", adminController.getDashboardStats);
router.get("/orders", adminController.getAllOrders);

module.exports = router;
