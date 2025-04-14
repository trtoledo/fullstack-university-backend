const express = require("express");
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


router.get("/", async (req, res) => {
  try {
    const professors = await prisma.professor.findMany({
      include: { department: true },
    });
    res.json(professors);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch professors" });
  }
});

router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const professor = await prisma.professor.findUnique({
      where: { id },
      include: { department: true },
    });
    if (!professor) return res.status(404).json({ error: "Not found" });
    res.json(professor);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch professor" });
  }
});

router.post("/", async (req, res) => {
  const { name, bio, email, profileImage, departmentId } = req.body;

  try {
    const newProfessor = await prisma.professor.create({
      data: {
        name,
        bio,
        email,
        profileImage,
        departmentId,
      },
    });
    res.status(201).json(newProfessor);
  } catch (error) {
    console.error("Error creating professor:", error);
    res.status(500).json({ error: "Failed to create professor" });
  }
});

router.delete("/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  try {
    await prisma.professor.delete({
      where: { id },
    });
    res.json({ message: "Professor deleted" });
  } catch (error) {
    console.error("Error deleting professor:", error);
    res.status(500).json({ error: "Failed to delete professor" });
  }
});


module.exports = router;