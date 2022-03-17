/*
  Warnings:

  - You are about to drop the `SongsOnPlaylist` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UsersOnPlaylist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "SongsOnPlaylist" DROP CONSTRAINT "SongsOnPlaylist_playlistId_fkey";

-- DropForeignKey
ALTER TABLE "SongsOnPlaylist" DROP CONSTRAINT "SongsOnPlaylist_songId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnPlaylist" DROP CONSTRAINT "UsersOnPlaylist_playlistId_fkey";

-- DropForeignKey
ALTER TABLE "UsersOnPlaylist" DROP CONSTRAINT "UsersOnPlaylist_userId_fkey";

-- DropTable
DROP TABLE "SongsOnPlaylist";

-- DropTable
DROP TABLE "UsersOnPlaylist";

-- CreateTable
CREATE TABLE "SongsOnPlaylists" (
    "songId" UUID NOT NULL,
    "playlistId" UUID NOT NULL,
    "order" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" UUID,

    CONSTRAINT "SongsOnPlaylists_pkey" PRIMARY KEY ("songId","playlistId")
);

-- CreateTable
CREATE TABLE "UsersOnPlaylists" (
    "userId" UUID NOT NULL,
    "playlistId" UUID NOT NULL,
    "isCreator" BOOLEAN NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" UUID,

    CONSTRAINT "UsersOnPlaylists_pkey" PRIMARY KEY ("userId","playlistId")
);

-- CreateIndex
CREATE UNIQUE INDEX "SongsOnPlaylists_playlistId_order_key" ON "SongsOnPlaylists"("playlistId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "UsersOnPlaylists_playlistId_isCreator_key" ON "UsersOnPlaylists"("playlistId", "isCreator");

-- AddForeignKey
ALTER TABLE "SongsOnPlaylists" ADD CONSTRAINT "SongsOnPlaylists_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SongsOnPlaylists" ADD CONSTRAINT "SongsOnPlaylists_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnPlaylists" ADD CONSTRAINT "UsersOnPlaylists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnPlaylists" ADD CONSTRAINT "UsersOnPlaylists_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
