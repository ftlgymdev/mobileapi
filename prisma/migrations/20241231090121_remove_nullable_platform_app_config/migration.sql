/*
  Warnings:

  - Made the column `platform` on table `mobile_app_config` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `mobile_app_config` MODIFY `platform` VARCHAR(191) NOT NULL;
