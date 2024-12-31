const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const create = async () => {
    const existingConfig1 = await prisma.appConfig.findUnique({
        where: { platform: 'ios' },
    });

    const appConfig1 = await prisma.appConfig.upsert({
        where: {
            id: existingConfig1 ? existingConfig1.id : 0,
        },
        update: {
            platform: 'ios',
            version: '1.0.0',
            force_update: false,
            download_url: 'https://apps.apple.com/id/app/ftl-gym/id1550542887?l=id',
            message: 'ios config',
        },
        create: {
            platform: 'ios',
            version: '1.0.0',
            force_update: false,
            download_url: 'https://apps.apple.com/id/app/ftl-gym/id1550542887?l=id',
            message: 'ios config',
        },
    });

    const existingConfig2 = await prisma.appConfig.findUnique({
        where: { platform: 'android' },
    });

    const appConfig2 = await prisma.appConfig.upsert({
        where: {
            id: existingConfig2 ? existingConfig2.id : 0,
        },
        update: {
            version: '1.0.0',
            force_update: false,
            download_url: 'https://play.google.com/store/apps/details?id=com.treshna.memberportal.fasterthanlight&hl=id',
            message: 'android config'
        },
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