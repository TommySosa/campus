/*
  Warnings:

  - You are about to drop the column `assigned_at` on the `assignedtask` table. All the data in the column will be lost.
  - You are about to drop the column `deadline` on the `assignedtask` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `assignedtask` DROP COLUMN `assigned_at`,
    DROP COLUMN `deadline`,
    ADD COLUMN `document_url` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `deliverable` ADD COLUMN `deadline` DATETIME(3) NULL;
