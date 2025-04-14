const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authenticateToken = require("../middleware/auth");


router.get("/", async (req, res) => {
  try {
    const departments = await prisma.department.findMany({
      include: { professors: true }, 
    });
    res.json(departments);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch departments" });
  }
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const department = await prisma.department.findUnique({
      where: { id },
      include: { professors: true },
    });
    if (!department) return res.status(404).json({ error: "Not found" });
    res.json(department);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch department" });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  const { name, description, bannerImage, contactInfo } = req.body;

  try {
    const newDepartment = await prisma.department.create({
      data: {
        name,
        description,
        bannerImage,
        contactInfo,
      },
    });
    res.status(201).json(newDepartment);
  } catch (error) {
    console.error("Error creating department:", error);
    res.status(500).json({ error: "Failed to create department" });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await prisma.department.delete({
      where: { id },
    });
    res.json({ message: "Department deleted" });
  } catch (error) {
    console.error("Error deleting department:", error);
    res.status(500).json({ error: "Failed to delete department" });
  }
});

module.exports = router;