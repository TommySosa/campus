-- CreateTable
CREATE TABLE `CourseGrade` (
    `id_grade` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `id_course` INTEGER NOT NULL,
    `exam_1` DOUBLE NULL,
    `exam_2` DOUBLE NULL,
    `exam_3` DOUBLE NULL,
    `practice` DOUBLE NULL,

    PRIMARY KEY (`id_grade`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `CourseGrade` ADD CONSTRAINT `CourseGrade_id_user_fkey` FOREIGN KEY (`id_user`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CourseGrade` ADD CONSTRAINT `CourseGrade_id_course_fkey` FOREIGN KEY (`id_course`) REFERENCES `Course`(`id_course`) ON DELETE RESTRICT ON UPDATE CASCADE;
