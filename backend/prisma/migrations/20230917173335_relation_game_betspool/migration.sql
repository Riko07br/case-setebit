/*
  Warnings:

  - Added the required column `betsPool_id` to the `games` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `games` ADD COLUMN `betsPool_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `games` ADD CONSTRAINT `games_betsPool_id_fkey` FOREIGN KEY (`betsPool_id`) REFERENCES `bets_pools`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
