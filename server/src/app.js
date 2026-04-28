const express = require("express");
const cors = require("cors");
const prisma = require("./config/db");
const apiRoutes = require("./routes/index");

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", apiRoutes);

// Root route
app.get("/", (req, res) => {
  res.json({ message: "Wooniq API is running 🚀" });
});

// Connect DB then start server (only in local/non-serverless environments)
if (process.env.VERCEL !== "1") {
  prisma.$connect()
    .then(() => {
      console.log("✅ Database connection successful");
      app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
      });
    })
    .catch(async (err) => {
      console.error("❌ Database connection error:", err);
      await prisma.$disconnect();
      process.exit(1);
    });
}

// Export for Vercel serverless runtime
module.exports = app;

