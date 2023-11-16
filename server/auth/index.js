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
    const {userName, password} = req.body;
    
})



module.exports = router;
