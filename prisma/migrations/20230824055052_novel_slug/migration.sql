/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Novel_Title` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Novel_Title` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Novel_Title" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Novel_Title_slug_key" ON "Novel_Title"("slug");
