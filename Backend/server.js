const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    const count = await prisma.user.count({
        where: { username: { startsWith: 'JohnDoe' } },
    });
    const newUsername = `JohnDoe${count + 1}`;
    const newUser = await prisma.user.create({
        data: {
            username: newUsername,
            password: "securepassword123",
            tasks: {
                create: [
                    {
                       task: "Complete this stupid project",
                        isImportant: false,
                        isUrgent: false,
                    }
                ],
            },
        },

    });

    console.log("New User Created: ", newUser);
}

main()
.catch((e) => {
    console.error('❌ Error during user creation:', err);
})
.finally(async () => {
    await prisma.$disconnect
});