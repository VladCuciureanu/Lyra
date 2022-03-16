-- AlterTable
ALTER TABLE "Playlist" ALTER COLUMN "artwork" DROP NOT NULL,
ALTER COLUMN "collaborative" SET DEFAULT false;
