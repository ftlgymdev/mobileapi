/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `member` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `password` to the `member` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Token` DROP FOREIGN KEY `Token_userId_fkey`;

-- DropForeignKey
ALTER TABLE `UserLanguage` DROP FOREIGN KEY `UserLanguage_userId_fkey`;

-- AlterTable
ALTER TABLE `member` ADD COLUMN `isEmailVerified` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `password` VARCHAR(191) NOT NULL,
    ADD COLUMN `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    MODIFY `email` VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE `User`;

-- CreateTable
CREATE TABLE `user` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `phone` VARCHAR(15) NOT NULL,
    `nik` VARCHAR(16) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `gender` INTEGER NOT NULL DEFAULT 0,
    `dob` DATE NOT NULL,
    `city_id` INTEGER NOT NULL,
    `province_id` INTEGER NOT NULL,
    `club_id` INTEGER NOT NULL,
    `address` VARCHAR(255) NOT NULL,
    `trainer_level_id` INTEGER NOT NULL DEFAULT 0,
    `description` VARCHAR(255) NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `reject_note` VARCHAR(100) NULL,
    `activated_by` BIGINT NULL,
    `activated_date` DATETIME(3) NULL,
    `join_date` DATETIME(3) NULL,
    `resign_date` DATETIME(3) NULL,
    `note_resign` TEXT NULL,
    `id_bitrix` INTEGER NULL,
    `id_gymmaster` INTEGER NULL,
    `resource_id` BIGINT NULL,
    `id_greatday` BIGINT NULL,
    `status_request` INTEGER NULL DEFAULT 0,
    `request` VARCHAR(256) NULL,
    `created_by` BIGINT NOT NULL,
    `updated_by` BIGINT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `no_rekening` VARCHAR(250) NULL,
    `nama_rekening` VARCHAR(250) NULL,
    `total_hari_kerja` INTEGER NOT NULL,
    `basic_salary` BIGINT NOT NULL,
    `positional_allowance` BIGINT NOT NULL,
    `other_allowances` BIGINT NOT NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `member_email_key` ON `member`(`email`);

-- AddForeignKey
ALTER TABLE `Token` ADD CONSTRAINT `Token_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserLanguage` ADD CONSTRAINT `UserLanguage_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
