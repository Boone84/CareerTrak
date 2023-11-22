const router = require("express").Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Returns all items
router.get("/", async (req, res) => {
    try {
      const results = await prisma.application.findMany();
      res.send(results);
    } catch (error) {
      console.error("Error fetching applications:", error);
      res.status(500).send({ message: "An error occurred on the server." });
    }
});

//creates a new application

router.get('/applications', async (req, res) => {
  try {
      const applications = await prisma.application.findMany({
          include: {
              user: true, 
          },
      });
      res.json(applications);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});




module.exports = router;

