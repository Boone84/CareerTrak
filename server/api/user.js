const router = require("express").Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require('bcryptjs');

//Returns all users
router.get("/", async (req, res) => {
  try {
    const results = await prisma.user.findMany();
    res.send(results);
  } catch (error) {
    res.send(error);
  }
});

//Returns a user with specified id
router.get("/:id", async (req, res) => {
  try {
    const result = await prisma.user.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (result) res.send(result);
    else res.send({ message: "User not Found" });
  } catch (error) {
    res.send(error.message);
  }
});

//Creates a new User
router.post("/", async (req, res) => {
  try {
      const saltRounds = 10; 
      const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

      const result = await prisma.user.create({
          data: {
              ...req.body,
              password: hashedPassword, 
          },
      });
      res.json(result);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


//Updates the user with specified id
router.put("/:id", async (req, res) => {
    try {
      const result = await prisma.user.update({
        where: { id: Number(req.params.id) },
        data: req.body,
      });
  
      if (result) {
        res.json(result);
      } else {
        res.json({ message: "Could not update user" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

//Deletes a user
router.delete("/:id", async (req, res) => {
  try {
    const result = await prisma.user.delete({
      where: { id: Number(req.params.id) },
    });
    if (result) res.send(result);
    else res.send({ message: "User not Found" });
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;