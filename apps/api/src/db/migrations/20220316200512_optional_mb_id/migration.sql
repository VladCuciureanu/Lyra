-- AlterTable
ALTER TABLE "Album" ALTER COLUMN "idMusicBrainz" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Artist" ALTER COLUMN "idMusicBrainz" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Song" ALTER COLUMN "idMusicBrainz" DROP NOT NULL;
