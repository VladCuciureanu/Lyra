-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "RecordType" AS ENUM ('ALBUM', 'EP', 'SINGLE', 'COMPILATION');

-- CreateEnum
CREATE TYPE "ArtistRole" AS ENUM ('ARTIST', 'ARRANGER', 'COMPOSER', 'CONDUCTOR', 'DJMIXER', 'ENGINEER', 'LYRICIST', 'MIXER', 'PRODUCER', 'REMIXER', 'PERFORMER');

-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "displayName" TEXT,
    "firstName" TEXT,
    "lastName" TEXT,
    "avatar" TEXT,
    "role" "UserRole" NOT NULL DEFAULT E'USER',
    "bio" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Album" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "idMusicBrainz" TEXT,
    "title" TEXT NOT NULL,
    "releaseDate" TIMESTAMP(3) NOT NULL,
    "recordType" "RecordType" NOT NULL,
    "artwork" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artist" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "idMusicBrainz" TEXT,
    "name" TEXT NOT NULL,
    "avatar" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Playlist" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "title" TEXT NOT NULL,
    "artwork" TEXT,
    "collaborative" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Playlist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Song" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "idMusicBrainz" TEXT,
    "title" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Song_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UsersOnUsers" (
    "followingUserId" UUID NOT NULL,
    "followedUserId" UUID NOT NULL,

    CONSTRAINT "UsersOnUsers_pkey" PRIMARY KEY ("followingUserId","followedUserId")
);

-- CreateTable
CREATE TABLE "LikedSongs" (
    "userId" UUID NOT NULL,
    "songId" UUID NOT NULL,
    "order" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" UUID,

    CONSTRAINT "LikedSongs_pkey" PRIMARY KEY ("userId","songId")
);

-- CreateTable
CREATE TABLE "ArtistsOnAlbums" (
    "artistId" UUID NOT NULL,
    "albumId" UUID NOT NULL,
    "order" INTEGER NOT NULL,
    "role" "ArtistRole" NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" UUID,

    CONSTRAINT "ArtistsOnAlbums_pkey" PRIMARY KEY ("artistId","albumId")
);

-- CreateTable
CREATE TABLE "ArtistsOnSongs" (
    "artistId" UUID NOT NULL,
    "songId" UUID NOT NULL,
    "order" INTEGER NOT NULL,
    "role" "ArtistRole" NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" UUID,

    CONSTRAINT "ArtistsOnSongs_pkey" PRIMARY KEY ("artistId","songId")
);

-- CreateTable
CREATE TABLE "GenresOnSongs" (
    "genreId" UUID NOT NULL,
    "songId" UUID NOT NULL,
    "order" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" UUID,

    CONSTRAINT "GenresOnSongs_pkey" PRIMARY KEY ("genreId","songId")
);

-- CreateTable
CREATE TABLE "SongsOnAlbums" (
    "songId" UUID NOT NULL,
    "albumId" UUID NOT NULL,
    "order" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" UUID
);

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
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UsersOnUsers_followingUserId_followedUserId_key" ON "UsersOnUsers"("followingUserId", "followedUserId");

-- CreateIndex
CREATE UNIQUE INDEX "LikedSongs_userId_order_key" ON "LikedSongs"("userId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "ArtistsOnAlbums_albumId_order_key" ON "ArtistsOnAlbums"("albumId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "ArtistsOnSongs_songId_order_key" ON "ArtistsOnSongs"("songId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "GenresOnSongs_songId_order_key" ON "GenresOnSongs"("songId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "SongsOnAlbums_albumId_order_key" ON "SongsOnAlbums"("albumId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "SongsOnPlaylists_playlistId_order_key" ON "SongsOnPlaylists"("playlistId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "UsersOnPlaylists_playlistId_isCreator_key" ON "UsersOnPlaylists"("playlistId", "isCreator");

-- AddForeignKey
ALTER TABLE "UsersOnUsers" ADD CONSTRAINT "UsersOnUsers_followingUserId_fkey" FOREIGN KEY ("followingUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnUsers" ADD CONSTRAINT "UsersOnUsers_followedUserId_fkey" FOREIGN KEY ("followedUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikedSongs" ADD CONSTRAINT "LikedSongs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikedSongs" ADD CONSTRAINT "LikedSongs_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistsOnAlbums" ADD CONSTRAINT "ArtistsOnAlbums_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistsOnAlbums" ADD CONSTRAINT "ArtistsOnAlbums_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistsOnSongs" ADD CONSTRAINT "ArtistsOnSongs_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "Artist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArtistsOnSongs" ADD CONSTRAINT "ArtistsOnSongs_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenresOnSongs" ADD CONSTRAINT "GenresOnSongs_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GenresOnSongs" ADD CONSTRAINT "GenresOnSongs_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SongsOnAlbums" ADD CONSTRAINT "SongsOnAlbums_albumId_fkey" FOREIGN KEY ("albumId") REFERENCES "Album"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SongsOnAlbums" ADD CONSTRAINT "SongsOnAlbums_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SongsOnPlaylists" ADD CONSTRAINT "SongsOnPlaylists_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SongsOnPlaylists" ADD CONSTRAINT "SongsOnPlaylists_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnPlaylists" ADD CONSTRAINT "UsersOnPlaylists_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnPlaylists" ADD CONSTRAINT "UsersOnPlaylists_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "Playlist"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
