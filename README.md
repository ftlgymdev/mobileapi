# mobileapi
API for FTL mobile apps

rm -r prisma/migrations
prisma migrate dev --skip-seed
prisma db seed

on production
npx prisma migrate deploy
npx prisma generate