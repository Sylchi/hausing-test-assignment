/*
  Warnings:

  - Added the required column `closedAt` to the `Ticket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ticket" ADD COLUMN     "closedAt" TIMESTAMP(3) NOT NULL;