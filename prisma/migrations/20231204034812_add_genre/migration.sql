/*
  Warnings:

  - Added the required column `id_genre` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `id_genre` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `Genre` (
    `id_genre` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id_genre`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_id_genre_fkey` FOREIGN KEY (`id_genre`) REFERENCES `Genre`(`id_genre`) ON DELETE RESTRICT ON UPDATE CASCADE;
