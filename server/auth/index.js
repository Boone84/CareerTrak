const router = require('express').Router();
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

router.get('/', (req, res) => {
    res.send('Auth router');
});

// Register a user
router.post('/register', async (req, res) => {
    try {
        const { password, ...userData } = req.body;
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const result = await prisma.user.create({
            data: {
                ...userData,
                password: hashedPassword,
            },
        });

        const { password: _, ...userWithoutPassword } = result;
        res.status(201).json(userWithoutPassword);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// user sign in
router.post('/signIn', async (req, res) => {
    try {
        const { userName, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { userName: userName },
        });

        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                const { password: _, ...userWithoutPassword } = user;
                res.send(userWithoutPassword); // Send user data without password
            } else {
                res.status(401).send({ message: 'Invalid Login' });
            }
        } else {
            res.status(401).send({ message: 'Invalid Login' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
