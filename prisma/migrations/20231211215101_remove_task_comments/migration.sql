/*
  Warnings:

  - You are about to drop the `taskscomments` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `taskscomments` DROP FOREIGN KEY `TasksComments_id_taskcomment_fkey`;

-- DropForeignKey
ALTER TABLE `taskscomments` DROP FOREIGN KEY `TasksComments_id_user_fkey`;

-- DropTable
DROP TABLE `taskscomments`;
