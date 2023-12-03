-- CreateTable
CREATE TABLE `CourseContent` (
    `id_content` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `pdf_url` VARCHAR(191) NOT NULL,
    `course_id` INTEGER NOT NULL,

    PRIMARY KEY (`id_content`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CourseContent` ADD CONSTRAINT `CourseContent_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `Course`(`id_course`) ON DELETE RESTRICT ON UPDATE CASCADE;
