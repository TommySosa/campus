/*
  Warnings:

  - You are about to drop the column `id_genre` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `genre` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `user` DROP FOREIGN KEY `User_id_genre_fkey`;

-- AlterTable
ALTER TABLE `user` DROP COLUMN `id_genre`,
    ALTER COLUMN `id_rol` DROP DEFAULT;

-- DropTable
DROP TABLE `genre`;
