const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const create = async () => {
    const appConfig1 = await prisma.appConfig.upsert({
        where: { platform: 'ios' },
        update: {},
        create: {
            platform: 'ios',
            version: '1.0.0',
            force_update: false,
            download_url: 'https://apps.apple.com/id/app/ftl-gym/id1550542887?l=id',
            message: 'ios config'
        },
    });

    const appConfig2 = await prisma.appConfig.upsert({
        where: { platform: 'android' },
        update: {},
        create: {
            platform: 'android',
            version: '1.0.0',
            force_update: false,
            download_url: 'https://play.google.com/store/apps/details?id=com.treshna.memberportal.fasterthanlight&hl=id',
            message: 'android config'
        },
    });

    console.log({ appConfig1, appConfig2 });
};

module.exports = {
    create
};