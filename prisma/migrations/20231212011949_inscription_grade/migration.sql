/*
  Warnings:

  - You are about to drop the column `exam_type` on the `grade` table. All the data in the column will be lost.
  - You are about to drop the column `id_course_grades` on the `grade` table. All the data in the column will be lost.
  - You are about to drop the column `id_user` on the `grade` table. All the data in the column will be lost.
  - You are about to drop the `coursegrade` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `exam_name` to the `Grade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_student_course` to the `Grade` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `coursegrade` DROP FOREIGN KEY `CourseGrade_id_course_fkey`;

-- DropForeignKey
ALTER TABLE `coursegrade` DROP FOREIGN KEY `CourseGrade_id_user_fkey`;

-- DropForeignKey
ALTER TABLE `grade` DROP FOREIGN KEY `Grade_id_course_grades_fkey`;

-- DropForeignKey
ALTER TABLE `grade` DROP FOREIGN KEY `Grade_id_user_fkey`;

-- AlterTable
ALTER TABLE `grade` DROP COLUMN `exam_type`,
    DROP COLUMN `id_course_grades`,
    DROP COLUMN `id_user`,
    ADD COLUMN `exam_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `id_student_course` INTEGER NOT NULL;

-- DropTable
DROP TABLE `coursegrade`;

-- AddForeignKey
ALTER TABLE `Grade` ADD CONSTRAINT `Grade_id_student_course_fkey` FOREIGN KEY (`id_student_course`) REFERENCES `StudentCourse`(`id_student_course`) ON DELETE RESTRICT ON UPDATE CASCADE;
