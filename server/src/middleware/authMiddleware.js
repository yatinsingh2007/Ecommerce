const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authorization token missing or invalid" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecretkey");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

const isSeller = (req, res, next) => {
  if (req.user && req.user.role === "seller") {
    return next();
  }
  return res.status(403).json({ error: "Access denied. Seller privileges required." });
};

const isUser = (req, res, next) => {
  if (req.user && req.user.role === "user") {
    return next();
  }
  return res.status(403).json({ error: "Access denied. User privileges required." });
};

module.exports = { authenticate, isSeller, isUser };
