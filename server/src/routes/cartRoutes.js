const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");
const { authenticate, isUser } = require("../middleware/authMiddleware");

router.use(authenticate, isUser);

router.get("/", cartController.getCart);
router.post("/", cartController.addToCart);
router.put("/:productId", cartController.updateCartItem);
router.delete("/clear", cartController.clearCart);
router.delete("/:productId", cartController.removeFromCart);

module.exports = router;
