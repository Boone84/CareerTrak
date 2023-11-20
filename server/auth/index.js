require('dotenv').config(); // Corrected dotenv import
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

const JWT = process.env.JWT || 'your-secret-key';

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

        const token = jwt.sign({ userId: userWithoutPassword.id }, JWT, {
            expiresIn: '24h',
        });
        console.log(token);

        res.status(201).json({ ...userWithoutPassword, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// User sign in
router.post('/signIn', async (req, res) => {
    try {
        const { userName, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { userName: userName },
        });

        if (user && (await bcrypt.compare(password, user.password))) {
            const { password: _, ...userWithoutPassword } = user;

            const token = jwt.sign({ userId: userWithoutPassword.id }, JWT, {
                expiresIn: '24h',
            });

            res.json({ ...userWithoutPassword, token });
        } else {
            res.status(401).send({ message: 'Invalid Login' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route that sends the user based on the given token
router.get('/me', async (req, res) => {
    // const auth = req.headers.authorization;
    // const token = auth?.startsWith("Bearer ") ? auth.slice(7) : null;

    // if (!token) {
    //     return res.status(401).send("No token provided");
    // }

    try {
        // const decoded = jwt.verify(token, JWT);
        const user = await prisma.user.findUnique({
            where: { id: req.userId },
        });

        if (!user) {
            return res.status(404).send('User not found');
        }

        const { password, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
    } catch (error) {
        res.status(401).send(error.message);
    }
});

module.exports = router;
