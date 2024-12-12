-- CreateTable
CREATE TABLE `User` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,
    `email` VARCHAR(255) NOT NULL,
    `isEmailVerified` BOOLEAN NOT NULL DEFAULT false,
    `role` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER',
    `password` VARCHAR(191) NOT NULL,
    `about` VARCHAR(191) NULL,
    `degreeId` BIGINT NULL,
    `school` VARCHAR(191) NULL,
    `industryId` BIGINT NULL,
    `occupationId` BIGINT NULL,
    `domicile` VARCHAR(191) NULL,
    `height` DOUBLE NULL,
    `zodiacId` BIGINT NULL,
    `bloodTypeId` BIGINT NULL,
    `lookingForId` BIGINT NULL,
    `petId` BIGINT NULL,
    `exerciseId` BIGINT NULL,
    `smokingHabitId` BIGINT NULL,
    `drinkingHabitId` BIGINT NULL,
    `offDayId` BIGINT NULL,
    `dietId` BIGINT NULL,
    `foodId` BIGINT NULL,
    `musicId` BIGINT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
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
CREATE TABLE `member` (
    `id` BIGINT NOT NULL,
    `member_id` VARCHAR(100) NOT NULL,
    `card_number` VARCHAR(20) NOT NULL,
    `type` BIGINT NOT NULL,
    `compliment_id` BIGINT NOT NULL,
    `compliment_type` VARCHAR(100) NOT NULL,
    `first_name` VARCHAR(50) NOT NULL,
    `last_name` VARCHAR(50) NOT NULL,
    `dob` DATETIME(3) NOT NULL,
    `gender` BIGINT NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `ktp_number` VARCHAR(16) NOT NULL,
    `weight` DOUBLE NOT NULL,
    `height` DOUBLE NOT NULL,
    `hobby` VARCHAR(191) NOT NULL,
    `gym_status` INTEGER NOT NULL,
    `gym_brand_id` INTEGER NOT NULL,
    `statement_compliment_status` INTEGER NOT NULL,
    `term_status` INTEGER NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `city_id` BIGINT NOT NULL,
    `state_id` BIGINT NOT NULL,
    `district_id` BIGINT NOT NULL,
    `subdistrict_id` BIGINT NOT NULL,
    `postal_code` VARCHAR(191) NOT NULL,
    `club_id` INTEGER NOT NULL,
    `status` INTEGER NOT NULL,
    `source` VARCHAR(191) NOT NULL,
    `appointment_id` BIGINT NOT NULL,
    `approve_status` INTEGER NOT NULL,
    `approved_by` BIGINT NOT NULL,
    `approved_at` DATETIME(3) NOT NULL,
    `created_by` BIGINT NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `member_package` (
    `id` BIGINT NOT NULL,
    `transaksi_id` BIGINT NOT NULL,
    `user_id` BIGINT NOT NULL,
    `member_id` BIGINT NOT NULL,
    `package_id` BIGINT NOT NULL,
    `personal_trainer_name` VARCHAR(191) NOT NULL,
    `status` INTEGER NOT NULL,
    `member_sharing_id` BIGINT NOT NULL,
    `member_br` BIGINT NOT NULL,
    `coupon_go` VARCHAR(191) NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `expired_date` DATETIME(3) NOT NULL,
    `value` DECIMAL(65, 30) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction` (
    `id` BIGINT NOT NULL,
    `transaksi_id` BIGINT NOT NULL,
    `type_transaksi` INTEGER NOT NULL,
    `user_id` BIGINT NOT NULL,
    `member_id` BIGINT NOT NULL,
    `package_id` BIGINT NOT NULL,
    `club_id` INTEGER NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL,
    `status` INTEGER NOT NULL,
    `approve_status` INTEGER NOT NULL,
    `approved_by` BIGINT NOT NULL,
    `approved_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_by` BIGINT NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `from_qios` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `club` (
    `id` BIGINT NOT NULL,
    `club_order` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `alias` VARCHAR(191) NOT NULL,
    `max_class_pilates` INTEGER NOT NULL,
    `club_opening_date` DATETIME(3) NOT NULL,
    `country_id` VARCHAR(191) NOT NULL,
    `city_id` INTEGER NOT NULL,
    `state_id` INTEGER NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `latitude` VARCHAR(191) NOT NULL,
    `longtitude` VARCHAR(191) NOT NULL,
    `postal_code` VARCHAR(191) NOT NULL,
    `status` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `link_payment` VARCHAR(191) NOT NULL,
    `doorid` BIGINT NOT NULL,
    `doorkey` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `club_city` (
    `id` BIGINT NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `status` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `request_transaksi` (
    `id` BIGINT NOT NULL,
    `created_by` BIGINT NOT NULL,
    `request_id` BIGINT NOT NULL,
    `member_id` BIGINT NOT NULL,
    `data_old` VARCHAR(191) NOT NULL,
    `first_name` VARCHAR(191) NOT NULL,
    `last_name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `relation_id` INTEGER NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `package` BIGINT NOT NULL,
    `card_member` VARCHAR(191) NOT NULL,
    `personal_trainer` BIGINT NOT NULL,
    `medical_reason_type` INTEGER NOT NULL,
    `freeze_duration_id` INTEGER NOT NULL,
    `cuti_date` DATETIME(3) NOT NULL,
    `cuti_amount` INTEGER NOT NULL,
    `medical_amount` BIGINT NOT NULL,
    `nominal_refund` BIGINT NOT NULL,
    `note` VARCHAR(191) NOT NULL,
    `status` INTEGER NOT NULL,
    `approve_status` INTEGER NOT NULL,
    `approve_status_2` BIGINT NOT NULL,
    `approve_status_3` BIGINT NOT NULL,
    `checked` INTEGER NOT NULL,
    `note_rejected` VARCHAR(191) NOT NULL,
    `note_rejected_2` VARCHAR(191) NOT NULL,
    `approved_by` BIGINT NOT NULL,
    `approved_by_2` BIGINT NOT NULL,
    `approved_by_3` BIGINT NOT NULL,
    `approved_at` DATETIME(3) NOT NULL,
    `approved_at_2` DATETIME(3) NOT NULL,
    `approved_at_3` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_by` BIGINT NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `external_id` VARCHAR(191) NOT NULL,
    `status_paid` VARCHAR(191) NOT NULL,
    `judul_permintaan` VARCHAR(191) NOT NULL,
    `deskripsi` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `schedule` (
    `id` BIGINT NOT NULL,
    `classid` BIGINT NOT NULL,
    `arrival` DATETIME(3) NOT NULL,
    `starttime` DATETIME(3) NOT NULL,
    `endtime` DATETIME(3) NOT NULL,
    `start_str` DATETIME(3) NOT NULL,
    `end_str` DATETIME(3) NOT NULL,
    `resourceid` BIGINT NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `price` BIGINT NOT NULL,
    `price_numeric` BIGINT NOT NULL,
    `spacesfree` INTEGER NOT NULL,
    `seatallocation` INTEGER NOT NULL,
    `multiplebookings` VARCHAR(191) NOT NULL,
    `minimum_age` INTEGER NOT NULL,
    `maximum_age` INTEGER NOT NULL,
    `age_min` INTEGER NOT NULL,
    `age_max` INTEGER NOT NULL,
    `max_waitinglist` INTEGER NOT NULL,
    `max_students` INTEGER NOT NULL,
    `bookingname` VARCHAR(191) NOT NULL,
    `classname` VARCHAR(191) NOT NULL,
    `bookable` INTEGER NOT NULL,
    `percentfull` INTEGER NOT NULL,
    `num_students` INTEGER NOT NULL,
    `already_booked_id` INTEGER NOT NULL,
    `already_booked_waitlist_id` INTEGER NOT NULL,
    `staffname` VARCHAR(191) NOT NULL,
    `cancelfee` BIGINT NOT NULL,
    `cancelbenefitloss` VARCHAR(191) NOT NULL,
    `waitlist_count` INTEGER NOT NULL,
    `substitute_staff` VARCHAR(191) NOT NULL,
    `staffid` BIGINT NOT NULL,
    `bgcolour` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `online_instruction` INTEGER NOT NULL,
    `informationlink` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191) NOT NULL,
    `companyid` BIGINT NOT NULL,
    `companyname` VARCHAR(191) NOT NULL,
    `allow_skip_payment` INTEGER NOT NULL,
    `prospectonly` VARCHAR(191) NOT NULL,
    `latebooking` VARCHAR(191) NOT NULL,
    `prereq_questionnaireid` INTEGER NOT NULL,
    `sortorder` INTEGER NOT NULL,
    `classtypeid` INTEGER NOT NULL,
    `classtypename` VARCHAR(191) NOT NULL,
    `repeatfreq` VARCHAR(191) NOT NULL,
    `repeatend` VARCHAR(191) NOT NULL,
    `auto_enrollment` VARCHAR(191) NOT NULL,
    `pre_discount_price` BIGINT NOT NULL,
    `startrow` INTEGER NOT NULL,
    `true_starttime` DATETIME(3) NOT NULL,
    `prevbid` BIGINT NOT NULL,
    `prevbid_waitlist` VARCHAR(191) NOT NULL,
    `current` VARCHAR(191) NOT NULL,
    `in_future` VARCHAR(191) NOT NULL,
    `NAME` VARCHAR(191) NOT NULL,
    `repeatend_iso` VARCHAR(191) NOT NULL,
    `repeatend_str` VARCHAR(191) NOT NULL,
    `arrival_iso` DATETIME(3) NOT NULL,
    `arrival_str` VARCHAR(191) NOT NULL,
    `single_guest_addonfee` VARCHAR(191) NOT NULL,
    `multiple_guest_addonfee` VARCHAR(191) NOT NULL,
    `layout` VARCHAR(191) NOT NULL,
    `description_html` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NOT NULL,
    `availability` VARCHAR(191) NOT NULL,
    `dayofweek` VARCHAR(191) NOT NULL,
    `staffphoto` VARCHAR(191) NOT NULL,
    `salary` BIGINT NOT NULL,
    `staffnamecover` VARCHAR(191) NOT NULL,
    `staffphotocover` VARCHAR(191) NOT NULL,
    `labelclass` VARCHAR(191) NOT NULL,
    `total_seat` INTEGER NOT NULL,
    `booked_seat` INTEGER NOT NULL,
    `available_seat` INTEGER NOT NULL,
    `submit` INTEGER NOT NULL,
    `status` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NOT NULL,
    `additionalstaffname` VARCHAR(191) NOT NULL,
    `display_push` INTEGER NOT NULL,
    `display_clear` INTEGER NOT NULL,
    `check_in` INTEGER NOT NULL,
    `max_member` INTEGER NOT NULL,
    `max_non_member` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `schedule_blist` (
    `bid` INTEGER NOT NULL,
    `scheduleid` BIGINT NOT NULL,
    `membershipid` VARCHAR(191) NOT NULL,
    `enquiryid` VARCHAR(191) NOT NULL,
    `repeat` VARCHAR(191) NOT NULL,
    `seat` INTEGER NOT NULL,
    `notes` VARCHAR(191) NOT NULL,
    `webbooking` INTEGER NOT NULL,
    `webip` VARCHAR(191) NOT NULL,
    `result` INTEGER NOT NULL,
    `parentid` INTEGER NOT NULL,
    `firstname` VARCHAR(191) NOT NULL,
    `surname` VARCHAR(191) NOT NULL,
    `checkin` DATETIME(3) NOT NULL,
    `price` DECIMAL(65, 30) NOT NULL,
    `rating` VARCHAR(191) NOT NULL,
    `feedback` VARCHAR(191) NOT NULL,
    `discount_code_id` VARCHAR(191) NOT NULL,
    `memberid` INTEGER NOT NULL,
    `birthday_today` VARCHAR(191) NOT NULL,
    `medicalconditions` VARCHAR(191) NOT NULL,
    `customdropdown2value` VARCHAR(191) NOT NULL,
    `customboolean8` VARCHAR(191) NOT NULL,
    `customtext1` VARCHAR(191) NOT NULL,
    `member_parentname` VARCHAR(191) NOT NULL,
    `paid` INTEGER NOT NULL,
    `fullname` VARCHAR(191) NOT NULL,
    `memberblank` VARCHAR(191) NOT NULL,
    `booking_name` VARCHAR(191) NOT NULL,
    `is_cancelling_membership` VARCHAR(191) NOT NULL,
    `is_firsttime_attend_classtype` VARCHAR(191) NOT NULL,
    `bookings_attended` INTEGER NOT NULL,
    `highlighted_waivers` VARCHAR(191) NOT NULL,
    `memberfile` VARCHAR(191) NOT NULL,
    `memberphoto` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`bid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `schedule_clist` (
    `id` BIGINT NOT NULL,
    `scheduleid` BIGINT NOT NULL,
    `repeat` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191) NOT NULL,
    `webbooking` INTEGER NOT NULL,
    `lastupdate` DATETIME(3) NOT NULL,
    `memberid` INTEGER NOT NULL,
    `member_parentname` VARCHAR(191) NOT NULL,
    `fullname` VARCHAR(191) NOT NULL,
    `memberblank` VARCHAR(191) NOT NULL,
    `booking_name` VARCHAR(191) NOT NULL,
    `memberfile` VARCHAR(191) NOT NULL,
    `memberphoto` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `gymmmaster_token` (
    `member_id` INTEGER NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expires` BIGINT NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`member_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `decrypt_pwd` (
    `member_id` INTEGER NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`member_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Token` ADD CONSTRAINT `Token_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserLanguage` ADD CONSTRAINT `UserLanguage_languageId_fkey` FOREIGN KEY (`languageId`) REFERENCES `Language`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserLanguage` ADD CONSTRAINT `UserLanguage_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
