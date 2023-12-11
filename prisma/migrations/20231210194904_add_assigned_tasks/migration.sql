-- CreateTable
CREATE TABLE `AssignedTask` (
    `id_assigned` INTEGER NOT NULL AUTO_INCREMENT,
    `id_deliverable` INTEGER NOT NULL,
    `id_user` INTEGER NOT NULL,

    PRIMARY KEY (`id_assigned`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AssignedTask` ADD CONSTRAINT `AssignedTask_id_deliverable_fkey` FOREIGN KEY (`id_deliverable`) REFERENCES `Deliverable`(`id_deliverable`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AssignedTask` ADD CONSTRAINT `AssignedTask_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;
