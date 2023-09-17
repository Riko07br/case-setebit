/*
  Warnings:

  - Added the required column `away_team_name` to the `games` table without a default value. This is not possible if the table is not empty.
  - Added the required column `home_team_name` to the `games` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `games` ADD COLUMN `away_team_name` VARCHAR(191) NOT NULL,
    ADD COLUMN `home_team_name` VARCHAR(191) NOT NULL;
