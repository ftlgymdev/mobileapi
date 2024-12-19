-- AlterTable
ALTER TABLE `notifications` MODIFY `senderId` INTEGER NULL,
    MODIFY `receiverId` INTEGER NULL,
    MODIFY `message` LONGTEXT NOT NULL;
