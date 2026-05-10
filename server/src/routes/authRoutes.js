const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/seller/register", authController.sellerRegister);
router.post("/seller/login", authController.sellerLogin);
router.post("/logout", authController.logout);

module.exports = router;
