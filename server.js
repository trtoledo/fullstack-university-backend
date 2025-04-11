const express = require("express");
const cors = require("cors");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors({ origin: /localhost/ }));
app.use(express.json()); // Parses JSON bodies

// Sample Route
app.get("/", (req, res) => {
  res.send("Welcome to Fullstack University API!");
});

app.get("/departments", async (req, res) => {
    const departments = await prisma.department.findMany({
      include: { professors: true },
    });
    res.json(departments);
  });


// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});