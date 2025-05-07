-- CreateEnum
CREATE TYPE "Language" AS ENUM ('EN', 'DE', 'ES');

-- AlterTable
ALTER TABLE "Album" ADD COLUMN     "language" "Language" NOT NULL DEFAULT 'EN';
