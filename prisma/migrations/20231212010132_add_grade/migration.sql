/*
  Warnings:

  - The primary key for the `coursegrade` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `exam_1` on the `coursegrade` table. All the data in the column will be lost.
  - You are about to drop the column `exam_2` on the `coursegrade` table. All the data in the column will be lost.
  - You are about to drop the column `exam_3` on the `coursegrade` table. All the data in the column will be lost.
  - You are about to drop the column `id_grade` on the `coursegrade` table. All the data in the column will be lost.
  - You are about to drop the column `practice` on the `coursegrade` table. All the data in the column will be lost.
  - Added the required column `id_course_grades` to the `CourseGrade` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `coursegrade` DROP PRIMARY KEY,
    DROP COLUMN `exam_1`,
    DROP COLUMN `exam_2`,
    DROP COLUMN `exam_3`,
    DROP COLUMN `id_grade`,
    DROP COLUMN `practice`,
    ADD COLUMN `id_course_grades` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id_course_grades`);

-- CreateTable
CREATE TABLE `Grade` (
    `id_grade` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `value` DOUBLE NOT NULL,
    `exam_type` VARCHAR(191) NOT NULL,
    `id_course_grades` INTEGER NOT NULL,

    PRIMARY KEY (`id_grade`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Grade` ADD CONSTRAINT `Grade_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Grade` ADD CONSTRAINT `Grade_id_course_grades_fkey` FOREIGN KEY (`id_course_grades`) REFERENCES `CourseGrade`(`id_course_grades`) ON DELETE RESTRICT ON UPDATE CASCADE;
