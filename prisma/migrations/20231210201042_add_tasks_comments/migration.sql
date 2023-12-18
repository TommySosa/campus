-- AlterTable
ALTER TABLE `assignedtask` ADD COLUMN `approved` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `assigned_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `deadline` DATETIME(3) NULL,
    ADD COLUMN `done` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `TasksComments` (
    `id_taskcomment` INTEGER NOT NULL AUTO_INCREMENT,
    `content` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `id_user` INTEGER NOT NULL,

    PRIMARY KEY (`id_taskcomment`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TasksComments` ADD CONSTRAINT `TasksComments_id_taskcomment_fkey` FOREIGN KEY (`id_taskcomment`) REFERENCES `AssignedTask`(`id_assigned`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TasksComments` ADD CONSTRAINT `TasksComments_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;
