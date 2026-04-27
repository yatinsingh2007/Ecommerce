const { sendResponse } = require("../utils/response");

const getHealthStatus = (req, res) => {
  return sendResponse(res, 200, "API is running smoothly", {
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
};

module.exports = { getHealthStatus };
