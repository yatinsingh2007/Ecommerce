const jwt = require("jsonwebtoken");
const { sendResponse } = require("../utils/response");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return sendResponse(res, 401, "Authorization token missing or invalid");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecretkey");
    req.user = decoded;
    next();
  } catch (error) {
    return sendResponse(res, 401, "Invalid or expired token");
  }
};

const isSeller = (req, res, next) => {
  if (req.user && req.user.role === "seller") {
    next();
  } else {
    return sendResponse(res, 403, "Access denied. Seller privileges required.");
  }
};

module.exports = { authenticate, isSeller };
