/*
  Warnings:

  - A unique constraint covering the columns `[platform]` on the table `mobile_app_config` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `mobile_app_config_platform_key` ON `mobile_app_config`(`platform`);
