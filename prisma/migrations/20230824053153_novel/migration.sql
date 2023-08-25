/*
  Warnings:

  - You are about to drop the `Chapter` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Title` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Chapter" DROP CONSTRAINT "Chapter_title_id_fkey";

-- DropTable
DROP TABLE "Chapter";

-- DropTable
DROP TABLE "Title";

-- CreateTable
CREATE TABLE "Novel_Title" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Novel_Title_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Novel_Chapter" (
    "id" SERIAL NOT NULL,
    "title_id" INTEGER NOT NULL,
    "chapter_number" TEXT NOT NULL,

    CONSTRAINT "Novel_Chapter_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Novel_Chapter_chapter_number_key" ON "Novel_Chapter"("chapter_number");

-- AddForeignKey
ALTER TABLE "Novel_Chapter" ADD CONSTRAINT "Novel_Chapter_title_id_fkey" FOREIGN KEY ("title_id") REFERENCES "Novel_Title"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
