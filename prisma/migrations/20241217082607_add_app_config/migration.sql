/*
  Warnings:

  - You are about to drop the column `about` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `bloodTypeId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `degreeId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `dietId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `domicile` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `drinkingHabitId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `exerciseId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `foodId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `height` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `industryId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lookingForId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `musicId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `occupationId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `offDayId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `petId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `school` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `smokingHabitId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `zodiacId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `User` DROP COLUMN `about`,
    DROP COLUMN `bloodTypeId`,
    DROP COLUMN `degreeId`,
    DROP COLUMN `dietId`,
    DROP COLUMN `domicile`,
    DROP COLUMN `drinkingHabitId`,
    DROP COLUMN `exerciseId`,
    DROP COLUMN `foodId`,
    DROP COLUMN `height`,
    DROP COLUMN `industryId`,
    DROP COLUMN `lookingForId`,
    DROP COLUMN `musicId`,
    DROP COLUMN `occupationId`,
    DROP COLUMN `offDayId`,
    DROP COLUMN `petId`,
    DROP COLUMN `school`,
    DROP COLUMN `smokingHabitId`,
    DROP COLUMN `zodiacId`;

-- CreateTable
CREATE TABLE `app_config` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `platform` VARCHAR(191) NOT NULL DEFAULT 'android',
    `version` VARCHAR(191) NOT NULL DEFAULT '1.0.0',
    `forceUpdate` BOOLEAN NOT NULL DEFAULT false,
    `downloadUrl` VARCHAR(191) NULL,
    `maintenanceMode` BOOLEAN NOT NULL DEFAULT false,
    `message` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
