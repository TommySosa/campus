/*
  Warnings:

  - You are about to drop the `draganddrop` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dragoption` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `draganddrop` DROP FOREIGN KEY `DragAndDrop_id_exercise_fkey`;

-- DropForeignKey
ALTER TABLE `dragoption` DROP FOREIGN KEY `DragOption_id_exercise_fkey`;

-- DropTable
DROP TABLE `draganddrop`;

-- DropTable
DROP TABLE `dragoption`;

-- CreateTable
CREATE TABLE `Deliverable` (
    `id_deliverable` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `instruction` VARCHAR(191) NOT NULL,
    `pdf_url` VARCHAR(191) NULL,
    `id_course` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_deliverable`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Deliverable` ADD CONSTRAINT `Deliverable_id_course_fkey` FOREIGN KEY (`id_course`) REFERENCES `Course`(`id_course`) ON DELETE RESTRICT ON UPDATE CASCADE;
