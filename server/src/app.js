const express = require("express");
const prisma = require("./config/db");
const apiRoutes = require("./routes/index");

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", apiRoutes);

// Root route
app.get("/", (req, res) => {
  res.redirect("/api/health");
});

// Database Connection & Server Start
async function startServer() {
  try {
    await prisma.$connect();
    console.log("✅ Database connection successful");
    
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("❌ Database connection error:", error);
    process.exit(1);
  }
}

startServer()
.catch(async (err) => {
    console.log(err);
    await prisma.$disconnect()
})
