const { PrismaClient } = require('@prisma/client')
const { encryptPassword } = require('../src/utils/encryption')
const prisma = new PrismaClient()

async function main() {
    const testUser = await prisma.user.upsert({
        where: { email: process.env.USER_TEST_EMAIL },
        update: {},
        create: {
            name: process.env.USER_TEST_NAME,
            email: process.env.USER_TEST_EMAIL,
            isEmailVerified: true,
            password: await encryptPassword(process.env.USER_TEST_PASSWORD),
        }
    })
    console.log({ testUser })
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })