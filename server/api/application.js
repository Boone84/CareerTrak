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



module.exports = router;

