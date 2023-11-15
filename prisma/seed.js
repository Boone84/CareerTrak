const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');

const main = async () => {
    // Salt rounds for bcrypt
    const saltRounds = 10;

    // Hash the password for user1
    const hashedPassword1 = await bcrypt.hash("1234", saltRounds);
    const user1 = await prisma.user.create({
        data: {
            firstName: 'Tony',
            lastName: "Blumberg",
            email: "tony@tonymail.com",
            password: hashedPassword1,
        },
    });

    // Hash the password for user2
    const hashedPassword2 = await bcrypt.hash("1234", saltRounds);
    const user2 = await prisma.user.create({
        data: {
            firstName: 'Boone',
            lastName: "Waldvogel",
            email: "boone@boonemail.com",
            password: hashedPassword2,
        },
    });
};

main()
    .catch((e) => {
        console.error(e);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
