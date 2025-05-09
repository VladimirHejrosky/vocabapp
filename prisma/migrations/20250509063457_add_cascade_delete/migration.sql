-- DropForeignKey
ALTER TABLE "Word" DROP CONSTRAINT "Word_albumId_fkey";

-- AddForeignKey
ALTER TABLE "Word" ADD CONSTRAINT "Word_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE CASCADE ON UPDATE CASCADE;
