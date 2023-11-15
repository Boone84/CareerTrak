const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient(); 

const main = async () => {

    const user1 = await prisma.user.create({
        data: {
            firstName: 'Tony',
            lastName: "Blumberg",
            email: "tony@tonymail.com",
            password: "1234",


        },
    });

    const user2 = await prisma.user.create({
        data: {
            firstName: 'Boone',
            lastName: "Waldvogel",
            email: "boone@boonemail.com",
            password: "1234",
            
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