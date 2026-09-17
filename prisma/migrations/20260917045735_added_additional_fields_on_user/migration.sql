-- AlterTable
ALTER TABLE "user" ADD COLUMN     "branch" TEXT,
ADD COLUMN     "employeeId" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'ADMIN',
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'ACTIVE';
