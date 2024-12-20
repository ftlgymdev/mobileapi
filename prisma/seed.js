const { PrismaClient } = require("@prisma/client");
const { encryptPassword } = require("../src/utils/encryption");
const prisma = new PrismaClient();

async function main() {
  const testUser = await prisma.user.upsert({
    where: { email: process.env.SEED_EMAIL },
    update: {},
    create: {
      id: BigInt(process.env.SEED_ID),
      member_id: process.env.SEED_MEMBER_ID,
      card_number: process.env.SEED_CARD_NUMBER,
      type: parseInt(process.env.SEED_TYPE),
      first_name: process.env.SEED_FIRST_NAME,
      last_name: process.env.SEED_LAST_NAME,
      dob: new Date(process.env.SEED_DOB),
      gender: parseInt(process.env.SEED_GENDER),
      email: process.env.SEED_EMAIL,
      phone: process.env.SEED_PHONE,
      ktp_number: process.env.SEED_KTP_NUMBER,
      weight: parseInt(process.env.SEED_WEIGHT),
      height: parseInt(process.env.SEED_HEIGHT),
      hobby: process.env.SEED_HOBBY,
      gym_status: parseInt(process.env.SEED_GYM_STATUS),
      gym_brand_id: parseInt(process.env.SEED_GYM_BRAND_ID),
      statement_compliment_status: parseInt(process.env.SEED_STATEMENT_COMPLIMENT_STATUS),
      term_status: parseInt(process.env.SEED_TERM_STATUS),
      address: process.env.SEED_ADDRESS,
      postal_code: process.env.SEED_POSTAL_CODE,
      club_id: parseInt(process.env.SEED_CLUB_ID),
      status: parseInt(process.env.SEED_STATUS),
      approve_status: parseInt(process.env.SEED_APPROVE_STATUS),
      approved_by: process.env.SEED_APPROVED_BY,
      approved_at: new Date(process.env.SEED_APPROVED_AT),
      created_by: process.env.SEED_CREATED_BY,
      created_at: new Date(process.env.SEED_CREATED_AT),
      updated_at: new Date(process.env.SEED_UPDATED_AT),
      is_email_verified: true,
      password: await encryptPassword(process.env.SEED_PASSWORD),
    },
  });
  const testUser2 = await prisma.user.upsert({
    where: { email: process.env.SEED_EMAIL_2 },
    update: {},
    create: {
      id: BigInt(process.env.SEED_ID_2),
      member_id: process.env.SEED_MEMBER_ID_2,
      card_number: process.env.SEED_CARD_NUMBER_2,
      type: parseInt(process.env.SEED_TYPE_2),
      first_name: process.env.SEED_FIRST_NAME_2,
      last_name: process.env.SEED_LAST_NAME_2,
      dob: new Date(process.env.SEED_DOB_2),
      gender: parseInt(process.env.SEED_GENDER_2),
      email: process.env.SEED_EMAIL_2,
      phone: process.env.SEED_PHONE_2,
      ktp_number: process.env.SEED_KTP_NUMBER_2,
      weight: parseInt(process.env.SEED_WEIGHT_2),
      height: parseInt(process.env.SEED_HEIGHT_2),
      hobby: process.env.SEED_HOBBY_2,
      gym_status: parseInt(process.env.SEED_GYM_STATUS_2),
      gym_brand_id: parseInt(process.env.SEED_GYM_BRAND_ID_2),
      statement_compliment_status: parseInt(process.env.SEED_STATEMENT_COMPLIMENT_STATUS_2),
      term_status: parseInt(process.env.SEED_TERM_STATUS_2),
      address: process.env.SEED_ADDRESS_2,
      postal_code: process.env.SEED_POSTAL_CODE_2,
      club_id: parseInt(process.env.SEED_CLUB_ID_2),
      status: parseInt(process.env.SEED_STATUS_2),
      approve_status: parseInt(process.env.SEED_APPROVE_STATUS_2),
      approved_by: process.env.SEED_APPROVED_BY_2,
      approved_at: new Date(process.env.SEED_APPROVED_AT_2),
      created_by: process.env.SEED_CREATED_BY,
      created_at: new Date(process.env.SEED_CREATED_AT_2),
      updated_at: new Date(process.env.SEED_UPDATED_AT_2),
      is_email_verified: true,
      password: await encryptPassword(process.env.SEED_PASSWORD_2),
    },
  });
  const testUser3 = await prisma.user.upsert({
    where: { email: process.env.SEED_EMAIL_3 },
    update: {},
    create: {
      id: BigInt(process.env.SEED_ID_3),
      member_id: process.env.SEED_MEMBER_ID_3,
      card_number: process.env.SEED_CARD_NUMBER_3,
      type: parseInt(process.env.SEED_TYPE_3),
      first_name: process.env.SEED_FIRST_NAME_3,
      last_name: process.env.SEED_LAST_NAME_3,
      dob: new Date(process.env.SEED_DOB_3),
      gender: parseInt(process.env.SEED_GENDER_3),
      email: process.env.SEED_EMAIL_3,
      phone: process.env.SEED_PHONE_3,
      ktp_number: process.env.SEED_KTP_NUMBER_3,
      weight: parseInt(process.env.SEED_WEIGHT_3),
      height: parseInt(process.env.SEED_HEIGHT_3),
      hobby: process.env.SEED_HOBBY_3,
      gym_status: parseInt(process.env.SEED_GYM_STATUS_3),
      gym_brand_id: parseInt(process.env.SEED_GYM_BRAND_ID_3),
      statement_compliment_status: parseInt(process.env.SEED_STATEMENT_COMPLIMENT_STATUS_3),
      term_status: parseInt(process.env.SEED_TERM_STATUS_3),
      address: process.env.SEED_ADDRESS_3,
      postal_code: process.env.SEED_POSTAL_CODE_3,
      club_id: parseInt(process.env.SEED_CLUB_ID_3),
      status: parseInt(process.env.SEED_STATUS_3),
      approve_status: parseInt(process.env.SEED_APPROVE_STATUS_3),
      approved_by: process.env.SEED_APPROVED_BY_3,
      approved_at: new Date(process.env.SEED_APPROVED_AT_3),
      created_by: process.env.SEED_CREATED_BY,
      created_at: new Date(process.env.SEED_CREATED_AT_3),
      updated_at: new Date(process.env.SEED_UPDATED_AT_3),
      is_email_verified: true,
      password: await encryptPassword(process.env.SEED_PASSWORD_3),
    },
  });
  console.log({ testUser, testUser2, testUser3 });
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
