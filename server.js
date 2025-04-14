const express = require("express");
const cors = require("cors");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const departmentRoutes = require("./routes/departments");
const professorRoutes = require("./routes/professors");

const authRoutes = require("./routes/auth");

const app = express();
const PORT = 3000;

app.use(cors({ origin: /localhost/ }));
app.use(express.json());

app.use("/departments", departmentRoutes);
app.use("/professors", professorRoutes);

app.use("/auth", authRoutes);

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
  app.get("/departments/:id", async (req, res) => {
    const id = Number(req.params.id);
    const department = await prisma.department.findUnique({
      where: { id },
      include: { professors: true } // optional: include related data
    });
  
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }
  
    res.json(department);
  });


// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});