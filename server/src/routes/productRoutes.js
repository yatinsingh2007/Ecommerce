const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { authenticate, isSeller } = require("../middleware/authMiddleware");

router.get("/", productController.getProducts);
router.get("/:id", productController.getProduct);
router.post("/", authenticate, isSeller, productController.addProduct);
router.put("/:id", authenticate, isSeller, productController.editProduct);
router.delete("/:id", authenticate, isSeller, productController.removeProduct);

module.exports = router;
