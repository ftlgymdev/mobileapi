-- CreateTable
CREATE TABLE `member` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `member_id` VARCHAR(100) NULL,
    `card_number` VARCHAR(20) NULL,
    `type` BIGINT NULL,
    `compliment_id` BIGINT NULL,
    `compliment_type` VARCHAR(100) NULL,
    `first_name` VARCHAR(50) NULL,
    `last_name` VARCHAR(50) NULL,
    `dob` DATETIME(3) NULL,
    `gender` BIGINT NULL,
    `email` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(191) NULL,
    `ktp_number` VARCHAR(16) NULL,
    `weight` DOUBLE NULL,
    `height` DOUBLE NULL,
    `hobby` VARCHAR(191) NULL,
    `gym_status` INTEGER NULL,
    `gym_brand_id` INTEGER NULL,
    `statement_compliment_status` INTEGER NULL,
    `term_status` INTEGER NULL,
    `address` VARCHAR(191) NULL,
    `city_id` BIGINT NULL,
    `state_id` BIGINT NULL,
    `district_id` BIGINT NULL,
    `subdistrict_id` BIGINT NULL,
    `postal_code` VARCHAR(191) NULL,
    `club_id` INTEGER NULL,
    `status` INTEGER NULL,
    `source` VARCHAR(191) NULL,
    `appointment_id` BIGINT NULL,
    `approve_status` INTEGER NULL,
    `approved_by` BIGINT NULL,
    `approved_at` DATETIME(3) NULL,
    `created_by` BIGINT NULL,
    `created_at` DATETIME(3) NULL,
    `updated_at` DATETIME(3) NULL,
    `is_email_verified` BOOLEAN NULL DEFAULT true,
    `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `password` VARCHAR(191) NULL,

    UNIQUE INDEX `member_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Token` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `token` VARCHAR(255) NOT NULL,
    `type` ENUM('ACCESS', 'REFRESH', 'RESET_PASSWORD', 'VERIFY_EMAIL') NOT NULL,
    `expires` DATETIME(3) NOT NULL,
    `blacklisted` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` BIGINT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Language` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Language_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserLanguage` (
    `userId` BIGINT NOT NULL,
    `languageId` BIGINT NOT NULL,

    PRIMARY KEY (`userId`, `languageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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
    `club_id` BIGINT NOT NULL,
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

-- CreateTable
CREATE TABLE `member_package` (
    `id` BIGINT NOT NULL,
    `transaksi_id` BIGINT NOT NULL DEFAULT 0,
    `user_id` BIGINT NOT NULL DEFAULT 0,
    `member_id` BIGINT NULL,
    `package_id` BIGINT NULL,
    `personal_trainer_name` VARCHAR(191) NULL,
    `status` INTEGER NULL,
    `member_sharing_id` BIGINT NULL,
    `member_br` BIGINT NULL,
    `coupon_go` VARCHAR(191) NULL,
    `start_date` DATETIME(3) NULL,
    `expired_date` DATETIME(3) NULL,
    `value` DECIMAL(65, 30) NULL,
    `created_at` DATETIME(3) NULL,
    `updated_at` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction` (
    `id` BIGINT NOT NULL,
    `transaksi_id` BIGINT NOT NULL DEFAULT 0,
    `type_transaksi` INTEGER NOT NULL DEFAULT 0,
    `user_id` BIGINT NULL,
    `member_id` BIGINT NULL,
    `package_id` BIGINT NULL,
    `club_id` INTEGER NULL,
    `price` DECIMAL(65, 30) NULL,
    `status` INTEGER NULL,
    `approve_status` INTEGER NULL DEFAULT 0,
    `approved_by` BIGINT NULL,
    `approved_at` DATETIME(3) NULL,
    `created_at` DATETIME(3) NULL,
    `updated_by` BIGINT NULL,
    `updated_at` DATETIME(3) NULL,
    `from_qios` INTEGER NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `club` (
    `id` BIGINT NOT NULL,
    `club_order` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `alias` VARCHAR(191) NOT NULL,
    `max_class_pilates` INTEGER NULL,
    `club_opening_date` DATETIME(3) NULL,
    `country_id` VARCHAR(191) NULL,
    `city_id` INTEGER NULL,
    `state_id` INTEGER NULL,
    `address` VARCHAR(191) NULL,
    `latitude` VARCHAR(191) NULL,
    `longtitude` VARCHAR(191) NULL,
    `postal_code` VARCHAR(191) NULL,
    `status` INTEGER NULL,
    `created_at` DATETIME(3) NULL,
    `updated_at` DATETIME(3) NULL,
    `link_payment` VARCHAR(191) NULL,
    `doorid` BIGINT NULL,
    `doorkey` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `club_city` (
    `id` BIGINT NOT NULL,
    `name` VARCHAR(191) NULL,
    `status` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `request_transaksi` (
    `id` BIGINT NOT NULL,
    `created_by` BIGINT NOT NULL,
    `request_id` BIGINT NULL,
    `member_id` BIGINT NULL,
    `data_old` VARCHAR(191) NULL,
    `first_name` VARCHAR(191) NULL,
    `last_name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `phone` VARCHAR(191) NULL,
    `address` VARCHAR(191) NULL,
    `relation_id` INTEGER NULL,
    `start_date` DATETIME(3) NULL,
    `package` BIGINT NULL,
    `card_member` VARCHAR(191) NULL,
    `personal_trainer` BIGINT NULL,
    `medical_reason_type` INTEGER NULL,
    `freeze_duration_id` INTEGER NULL,
    `cuti_date` DATETIME(3) NULL,
    `cuti_amount` INTEGER NULL,
    `medical_amount` BIGINT NULL DEFAULT 0,
    `nominal_refund` BIGINT NULL DEFAULT 0,
    `note` VARCHAR(191) NULL,
    `status` INTEGER NULL,
    `approve_status` INTEGER NULL,
    `approve_status_2` BIGINT NULL,
    `approve_status_3` BIGINT NULL,
    `checked` INTEGER NOT NULL DEFAULT 0,
    `note_rejected` VARCHAR(191) NULL,
    `note_rejected_2` VARCHAR(191) NULL,
    `approved_by` BIGINT NULL,
    `approved_by_2` BIGINT NULL,
    `approved_by_3` BIGINT NULL,
    `approved_at` DATETIME(3) NULL,
    `approved_at_2` DATETIME(3) NULL,
    `approved_at_3` DATETIME(3) NULL,
    `created_at` DATETIME(3) NULL,
    `updated_by` BIGINT NULL,
    `updated_at` DATETIME(3) NULL,
    `external_id` VARCHAR(191) NULL,
    `status_paid` VARCHAR(191) NULL,
    `judul_permintaan` VARCHAR(191) NULL,
    `deskripsi` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `schedule` (
    `id` BIGINT NOT NULL,
    `classid` BIGINT NULL,
    `arrival` DATETIME(3) NULL,
    `starttime` DATETIME(3) NULL,
    `endtime` DATETIME(3) NULL,
    `start_str` DATETIME(3) NULL,
    `end_str` DATETIME(3) NULL,
    `resourceid` BIGINT NULL,
    `location` VARCHAR(191) NULL,
    `price` BIGINT NULL,
    `price_numeric` BIGINT NULL,
    `spacesfree` INTEGER NULL,
    `seatallocation` INTEGER NULL,
    `multiplebookings` VARCHAR(191) NULL,
    `minimum_age` INTEGER NULL,
    `maximum_age` INTEGER NULL,
    `age_min` INTEGER NULL,
    `age_max` INTEGER NULL,
    `max_waitinglist` INTEGER NULL,
    `max_students` INTEGER NULL,
    `bookingname` VARCHAR(191) NULL,
    `classname` VARCHAR(191) NULL,
    `bookable` INTEGER NULL,
    `percentfull` INTEGER NULL,
    `num_students` INTEGER NULL,
    `already_booked_id` INTEGER NULL,
    `already_booked_waitlist_id` INTEGER NULL,
    `staffname` VARCHAR(191) NULL,
    `cancelfee` BIGINT NULL,
    `cancelbenefitloss` VARCHAR(191) NULL,
    `waitlist_count` INTEGER NULL,
    `substitute_staff` VARCHAR(191) NULL,
    `staffid` BIGINT NULL,
    `bgcolour` VARCHAR(191) NULL,
    `description` VARCHAR(191) NULL,
    `online_instruction` INTEGER NULL,
    `informationlink` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,
    `companyid` BIGINT NULL,
    `companyname` VARCHAR(191) NULL,
    `allow_skip_payment` INTEGER NULL,
    `prospectonly` VARCHAR(191) NULL,
    `latebooking` VARCHAR(191) NULL,
    `prereq_questionnaireid` INTEGER NULL,
    `sortorder` INTEGER NULL,
    `classtypeid` INTEGER NULL,
    `classtypename` VARCHAR(191) NULL,
    `repeatfreq` VARCHAR(191) NULL,
    `repeatend` VARCHAR(191) NULL,
    `auto_enrollment` VARCHAR(191) NULL,
    `pre_discount_price` BIGINT NULL,
    `startrow` INTEGER NULL,
    `true_starttime` DATETIME(3) NULL,
    `prevbid` BIGINT NULL,
    `prevbid_waitlist` VARCHAR(191) NULL,
    `current` VARCHAR(191) NULL,
    `in_future` VARCHAR(191) NULL,
    `NAME` VARCHAR(191) NULL,
    `repeatend_iso` VARCHAR(191) NULL,
    `repeatend_str` VARCHAR(191) NULL,
    `arrival_iso` DATETIME(3) NULL,
    `arrival_str` VARCHAR(191) NULL,
    `single_guest_addonfee` VARCHAR(191) NULL,
    `multiple_guest_addonfee` VARCHAR(191) NULL,
    `layout` VARCHAR(191) NULL,
    `description_html` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `availability` VARCHAR(191) NULL,
    `dayofweek` VARCHAR(191) NULL,
    `staffphoto` VARCHAR(191) NULL,
    `salary` BIGINT NULL DEFAULT 0,
    `staffnamecover` VARCHAR(191) NULL,
    `staffphotocover` VARCHAR(191) NULL,
    `labelclass` VARCHAR(191) NULL,
    `total_seat` INTEGER NULL DEFAULT 0,
    `booked_seat` INTEGER NULL DEFAULT 0,
    `available_seat` INTEGER NULL DEFAULT 0,
    `submit` INTEGER NULL DEFAULT 0,
    `status` INTEGER NULL DEFAULT 0,
    `created_at` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NULL,
    `additionalstaffname` VARCHAR(191) NULL,
    `display_push` INTEGER NULL DEFAULT 0,
    `display_clear` INTEGER NULL DEFAULT 0,
    `check_in` INTEGER NULL,
    `max_member` INTEGER NULL,
    `max_non_member` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `schedule_blist` (
    `bid` INTEGER NOT NULL,
    `scheduleid` BIGINT NULL,
    `membershipid` VARCHAR(191) NULL,
    `enquiryid` VARCHAR(191) NULL,
    `repeat` VARCHAR(191) NULL,
    `seat` INTEGER NULL,
    `notes` VARCHAR(191) NULL,
    `webbooking` INTEGER NULL,
    `webip` VARCHAR(191) NULL,
    `result` INTEGER NULL,
    `parentid` INTEGER NULL,
    `firstname` VARCHAR(191) NULL,
    `surname` VARCHAR(191) NULL,
    `checkin` DATETIME(3) NULL,
    `price` DECIMAL(65, 30) NULL,
    `rating` VARCHAR(191) NULL,
    `feedback` VARCHAR(191) NULL,
    `discount_code_id` VARCHAR(191) NULL,
    `memberid` INTEGER NULL,
    `birthday_today` VARCHAR(191) NULL,
    `medicalconditions` VARCHAR(191) NULL,
    `customdropdown2value` VARCHAR(191) NULL,
    `customboolean8` VARCHAR(191) NULL,
    `customtext1` VARCHAR(191) NULL,
    `member_parentname` VARCHAR(191) NULL,
    `paid` INTEGER NULL,
    `fullname` VARCHAR(191) NULL,
    `memberblank` VARCHAR(191) NULL,
    `booking_name` VARCHAR(191) NULL,
    `is_cancelling_membership` VARCHAR(191) NULL,
    `is_firsttime_attend_classtype` VARCHAR(191) NULL,
    `bookings_attended` INTEGER NULL,
    `highlighted_waivers` VARCHAR(191) NULL,
    `memberfile` VARCHAR(191) NULL,
    `memberphoto` VARCHAR(191) NULL,

    PRIMARY KEY (`bid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `schedule_clist` (
    `id` BIGINT NOT NULL,
    `scheduleid` BIGINT NULL,
    `repeat` VARCHAR(191) NULL,
    `notes` VARCHAR(191) NULL,
    `webbooking` INTEGER NULL,
    `lastupdate` DATETIME(3) NULL,
    `memberid` INTEGER NULL,
    `member_parentname` VARCHAR(191) NULL,
    `fullname` VARCHAR(191) NULL,
    `memberblank` VARCHAR(191) NULL,
    `booking_name` VARCHAR(191) NULL,
    `memberfile` VARCHAR(191) NULL,
    `memberphoto` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mobile_gymmmaster_member_tokens` (
    `member_id` INTEGER NOT NULL,
    `token` VARCHAR(500) NOT NULL,
    `expires` BIGINT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`member_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `decrypt_memberpwd` (
    `member_id` INTEGER NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `decrypt_memberpwd_email_key`(`email`),
    PRIMARY KEY (`member_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mobile_notifications` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `senderId` BIGINT NULL,
    `receiverId` BIGINT NULL,
    `title` VARCHAR(255) NOT NULL,
    `message` LONGTEXT NULL,
    `isRead` BOOLEAN NOT NULL DEFAULT false,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mobile_app_config` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `platform` VARCHAR(191) NULL,
    `version` VARCHAR(191) NULL,
    `forceUpdate` BOOLEAN NOT NULL DEFAULT false,
    `downloadUrl` VARCHAR(191) NULL,
    `maintenanceMode` BOOLEAN NOT NULL DEFAULT false,
    `message` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

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

-- CreateTable
CREATE TABLE `_ClubToUser` (
    `A` BIGINT NOT NULL,
    `B` BIGINT NOT NULL,

    UNIQUE INDEX `_ClubToUser_AB_unique`(`A`, `B`),
    INDEX `_ClubToUser_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Token` ADD CONSTRAINT `Token_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserLanguage` ADD CONSTRAINT `UserLanguage_languageId_fkey` FOREIGN KEY (`languageId`) REFERENCES `Language`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserLanguage` ADD CONSTRAINT `UserLanguage_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_club_id_fkey` FOREIGN KEY (`club_id`) REFERENCES `club`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mobile_notifications` ADD CONSTRAINT `mobile_notifications_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `member`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mobile_notifications` ADD CONSTRAINT `mobile_notifications_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `member`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mobile_club_images` ADD CONSTRAINT `mobile_club_images_club_id_fkey` FOREIGN KEY (`club_id`) REFERENCES `club`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClubToUser` ADD CONSTRAINT `_ClubToUser_A_fkey` FOREIGN KEY (`A`) REFERENCES `club`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ClubToUser` ADD CONSTRAINT `_ClubToUser_B_fkey` FOREIGN KEY (`B`) REFERENCES `member`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
