/*
  Warnings:

  - Added the required column `content` to the `Novel_Chapter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Novel_Chapter" ADD COLUMN     "content" TEXT NOT NULL;
