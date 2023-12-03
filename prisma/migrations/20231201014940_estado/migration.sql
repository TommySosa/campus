/*
  Warnings:

  - You are about to drop the column `courseId_course` on the `exercise` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `exercise` DROP FOREIGN KEY `Exercise_courseId_course_fkey`;

-- AlterTable
ALTER TABLE `course` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `exercise` DROP COLUMN `courseId_course`,
    ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `module` ADD COLUMN `active` BOOLEAN NOT NULL DEFAULT true;
