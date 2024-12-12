-- CreateTable
CREATE TABLE `GymMasterToken` (
    `member_id` INTEGER NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` BIGINT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`member_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
