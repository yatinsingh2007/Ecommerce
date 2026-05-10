const { prisma } = require("../db/dbConfig");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

// User Auth
const register = async (req, res) => {
  try {
    const { email, name, password, phone } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword, phone },
    });

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(401).json({ error: "Invalid email or password" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ error: "Invalid email or password" });

    const token = jwt.sign({ userId: user.id, email: user.email, role: "user" }, JWT_SECRET, { expiresIn: "24h" });
    return res.status(200).json({ token, user: { id: user.id, name: user.name, email: user.email, role: "user" } });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// Seller (Admin) Auth
const sellerRegister = async (req, res) => {
  try {
    const { email, name, password, phone, address, city, state, country, pincode } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const seller = await prisma.seller.create({
      data: { email, name, password: hashedPassword, phone, address, city, state, country, pincode },
    });

    return res.status(201).json({ message: "Seller registered successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const seller = await prisma.seller.findUnique({ where: { email } });
    if (!seller) return res.status(401).json({ error: "Invalid email or password" });

    const isPasswordValid = await bcrypt.compare(password, seller.password);
    if (!isPasswordValid) return res.status(401).json({ error: "Invalid email or password" });

    const token = jwt.sign({ userId: seller.id, email: seller.email, role: "seller" }, JWT_SECRET, { expiresIn: "24h" });
    return res.status(200).json({ token, user: { id: seller.id, name: seller.name, email: seller.email, role: "seller" } });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const logout = async (req, res) => {
  return res.status(200).json({ message: "Logged out successfully" });
};

module.exports = {
  register,
  login,
  sellerRegister,
  sellerLogin,
  logout
};