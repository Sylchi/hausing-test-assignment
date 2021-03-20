-- CreateTable
CREATE TABLE "Ticket" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "content" TEXT NOT NULL,
    "priority" SMALLINT NOT NULL,

    PRIMARY KEY ("id")
);
