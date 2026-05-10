

const getHealthStatus = (req, res) => {
  return res.status(200).json({
    message: "API is running smoothly",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
};

module.exports = { getHealthStatus };
