const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
    const newUser = await prisma.user.create({
        data: {
            username: "JohnDoe",
            password: "securepassword123",
            tasks: {
                create: [
                    {task: "Complete this stupid project"}
                ],
            },
        },

    });

    console.log("New User Created: ", newUser);
}

main()
.catch((e) => {
    console.error(e);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect
});