-- AlterTable
ALTER TABLE "Ticket" ALTER COLUMN "priority" SET DEFAULT 1,
ALTER COLUMN "closedAt" DROP NOT NULL;
