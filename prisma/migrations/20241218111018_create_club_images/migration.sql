/*
  Warnings:

  - Made the column `message` on table `app_config` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `app_config` ALTER COLUMN `platform` DROP DEFAULT,
    ALTER COLUMN `version` DROP DEFAULT,
    MODIFY `message` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `mobile_club_images` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `club_id` BIGINT NOT NULL,
    `file_base_url` VARCHAR(100) NOT NULL,
    `file_base_path` VARCHAR(250) NOT NULL,
    `file_path` VARCHAR(100) NOT NULL,
    `file_name` VARCHAR(250) NOT NULL,
    `file_extention` VARCHAR(50) NOT NULL,
    `status` INTEGER NOT NULL DEFAULT 1,
    `created_by` BIGINT NOT NULL,
    `updated_by` BIGINT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mobile_banners` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NULL,
    `file_base_url` VARCHAR(100) NOT NULL,
    `file_base_path` VARCHAR(250) NOT NULL,
    `file_path` VARCHAR(100) NOT NULL,
    `file_name` VARCHAR(250) NOT NULL,
    `file_extention` VARCHAR(50) NOT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE', 'ARCHIVED') NOT NULL DEFAULT 'ACTIVE',
    `priority` INTEGER NOT NULL DEFAULT 1,
    `startDate` DATETIME(3) NULL,
    `end_date` DATETIME(3) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `mobile_club_images` ADD CONSTRAINT `mobile_club_images_club_id_fkey` FOREIGN KEY (`club_id`) REFERENCES `club`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
