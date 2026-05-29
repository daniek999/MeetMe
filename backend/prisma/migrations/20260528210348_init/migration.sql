-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NOT NULL,
    `displayName` VARCHAR(100) NULL,
    `email` VARCHAR(100) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `bio` VARCHAR(255) NULL,
    `content` TEXT NULL,
    `avatarUrl` TEXT NULL,
    `bannerUrl` TEXT NULL,
    `role` ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    `status` ENUM('enabled', 'suspended', 'banned') NOT NULL DEFAULT 'enabled',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_username_key`(`username`),
    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Social` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `youtubeUrl` TEXT NULL,
    `twitterUrl` TEXT NULL,
    `patreonUrl` TEXT NULL,
    `discordUrl` TEXT NULL,
    `instagramUrl` TEXT NULL,
    `twitchUrl` TEXT NULL,
    `linkedinUrl` TEXT NULL,
    `websiteUrl` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Social_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Statistic` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `views` INTEGER NOT NULL DEFAULT 0,
    `likes` INTEGER NOT NULL DEFAULT 0,
    `follows` INTEGER NOT NULL DEFAULT 0,
    `shares` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `Statistic_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Theme` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `primaryColor` VARCHAR(7) NOT NULL DEFAULT '#000000',
    `backgroundColor` VARCHAR(7) NOT NULL DEFAULT '#ffffff',
    `fontFamily` VARCHAR(100) NOT NULL DEFAULT 'Inter',
    `layout` VARCHAR(50) NOT NULL DEFAULT 'classic',
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Theme_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `StatisticMeter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userOriginId` INTEGER NOT NULL,
    `userDestinyId` INTEGER NOT NULL,
    `type` ENUM('like', 'follow') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `StatisticMeter_userOriginId_userDestinyId_type_key`(`userOriginId`, `userDestinyId`, `type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Social` ADD CONSTRAINT `Social_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Statistic` ADD CONSTRAINT `Statistic_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Theme` ADD CONSTRAINT `Theme_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StatisticMeter` ADD CONSTRAINT `StatisticMeter_userOriginId_fkey` FOREIGN KEY (`userOriginId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `StatisticMeter` ADD CONSTRAINT `StatisticMeter_userDestinyId_fkey` FOREIGN KEY (`userDestinyId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
