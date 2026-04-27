const express = require("express");
const app = express();
const { prisma } = require("./db/dbConfig");




app.get("/", (req, res) => {
    res.send("Hello World!");
});


async function main() {
    try {
        await prisma.$connect();
        console.log("Database connection successful");
        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    } catch (error) {
        console.error("Database connection error:", error);
    }
}

main()
.catch((error) => {
    console.error("Error in main function:", error);
})
.finally(async () => {
    await prisma.$disconnect();
});
