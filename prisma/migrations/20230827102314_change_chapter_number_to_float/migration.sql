/*
  Warnings:

  - Changed the type of `chapter_number` on the `Novel_Chapter` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Novel_Chapter" DROP COLUMN "chapter_number",
ADD COLUMN     "chapter_number" DOUBLE PRECISION NOT NULL;
