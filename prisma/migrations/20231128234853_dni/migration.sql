/*
  Warnings:

  - A unique constraint covering the columns `[dni]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Made the column `dni` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `user` MODIFY `dni` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_dni_key` ON `User`(`dni`);
