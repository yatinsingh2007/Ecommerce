const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const { authenticate, isUser } = require("../middleware/authMiddleware");

router.use(authenticate, isUser);

router.post("/", orderController.placeOrder);
router.get("/", orderController.getUserOrders);
router.get("/:id", orderController.getOrderById);
router.patch("/:id/cancel", orderController.cancelOrder);

module.exports = router;
