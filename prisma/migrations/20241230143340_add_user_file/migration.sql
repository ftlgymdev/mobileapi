-- CreateTable
CREATE TABLE `member_file` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `member_id` BIGINT NULL,
    `compliment_id` BIGINT NULL,
    `request_id` BIGINT NOT NULL,
    `payment_id` BIGINT NULL,
    `reference_id` BIGINT NULL,
    `title` VARCHAR(225) NULL,
    `status` INTEGER NULL,
    `description` VARCHAR(255) NULL,
    `file_type_id` INTEGER NULL,
    `file_base_url` VARCHAR(256) NULL,
    `file_base_path` VARCHAR(256) NULL,
    `file_path` VARCHAR(100) NULL,
    `file_name` VARCHAR(100) NULL,
    `file_extention` VARCHAR(100) NULL,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `member_file` ADD CONSTRAINT `member_file_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `member`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
