const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { userSeeder, appConfigSeeder } = require("./seeders");

async function main() {
  userSeeder.create();
  appConfigSeeder.create();
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
