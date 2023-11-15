const router = require("express").Router();
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get("/", (req, res) => {
    res.send("Auth router");
});

// Register a user
router.post("/register", async (req, res) => {
    try {
        const { password, ...userData } = req.body;
        const saltRounds = 10; // Or use an environment variable for this
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const result = await prisma.user.create({
            data: {
                ...userData,
                password: hashedPassword,
            },
        });

        // Exclude the password from the response
        const { password: _, ...userWithoutPassword } = result;
        res.status(201).json(userWithoutPassword);
    } catch (error) {
        // You can refine this to handle specific types of errors more gracefully
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
