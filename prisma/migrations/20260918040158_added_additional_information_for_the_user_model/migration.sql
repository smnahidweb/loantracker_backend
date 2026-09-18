/*
  Warnings:

  - A unique constraint covering the columns `[nid]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "address" TEXT,
ADD COLUMN     "designation" TEXT,
ADD COLUMN     "education" TEXT,
ADD COLUMN     "joiningDate" TIMESTAMP(3),
ADD COLUMN     "nid" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "user_nid_key" ON "user"("nid");
