import { ArtistRole, RecordType, UserRole } from "@prisma/client"
import { IS_PRODUCTION } from "./config"
import { prisma } from "./prisma"

async function seed() {
  // TODO(Vlad): Clean up later on
  await clearDatabase()

  if (IS_PRODUCTION || (await prisma.user.count()) > 0) {
    return
  }

  await seedUsers()
  await connectUsers()

  await seedGenres()
  await seedArtists()
  await seedAlbums()
  await seedSongs()
  await seedPlaylists()

  await linkModels()
}

async function seedUsers() {
  return await prisma.user.createMany({
    data: [
      {
        email: "admin@vladinski.md",
        password: "test1234",
        displayName: "Admeenie",
        firstName: "Admin",
        lastName: "Testington",
        verified: true,
        role: UserRole.ADMIN,
      },
      {
        email: "user@vladinski.md",
        password: "test1234",
        displayName: "Yoozer",
        firstName: "User",
        lastName: "Simpleton",
        verified: true,
        role: UserRole.USER,
      },
      {
        email: "unverified@vladinski.md",
        password: "test1234",
        verified: false,
      },
    ],
  })
}

async function connectUsers() {
  const [admin, user, unverified] = await prisma.user.findMany()
  return prisma.usersOnUsers.createMany({
    data: [
      { followedUserId: admin.id, followingUserId: user.id },
      { followedUserId: admin.id, followingUserId: unverified.id },
      { followedUserId: unverified.id, followingUserId: admin.id },
    ],
  })
}

async function seedGenres() {
  const genres = ["Rock", "Jazz", "Pop", "Blues", "Hip-Hop", "Classical", "Funk", "Soul", "Electronic"]
  return prisma.genre.createMany({
    data: genres.map((genreName) => {
      return { name: genreName }
    }),
  })
}

async function seedArtists() {
  return prisma.artist.createMany({
    data: [
      {
        name: "Artist 1",
      },
      {
        name: "Artist 2",
      },
    ],
  })
}

async function seedAlbums() {
  await prisma.album.createMany({
    data: [
      {
        title: "Album 1",
        releaseDate: new Date("2019-08-16"),
        recordType: RecordType.ALBUM,
      },
      {
        title: "Album 2",
        releaseDate: new Date("2018-11-09"),
        recordType: RecordType.EP,
      },
    ],
  })
}

async function seedSongs() {
  await prisma.song.createMany({
    data: [
      {
        title: "Song 1",
        filePath: "",
      },
      {
        title: "Song 2",
        filePath: "",
      },
      {
        title: "Song 3",
        filePath: "",
      },
      {
        title: "Song 1",
        filePath: "",
      },
      {
        title: "Song 2",
        filePath: "",
      },
    ],
  })
}

async function seedPlaylists() {
  return prisma.playlist.create({
    data: { title: "Playlist 1" },
  })
}

async function linkModels() {
  // Data

  const artists = await prisma.artist.findMany()
  const albums = await prisma.album.findMany()
  const genres = await prisma.genre.findMany()
  const playlist = await prisma.playlist.findFirst()
  const users = await prisma.user.findMany()
  const songs = await prisma.song.findMany()

  // Seeding starts here...

  // Artists on Albums

  await prisma.artistsOnAlbums.createMany({
    data: [
      {
        artistId: artists[0].id,
        albumId: albums[0].id,
        order: 0,
        role: ArtistRole.COMPOSER,
      },
      {
        artistId: artists[1].id,
        albumId: albums[0].id,
        order: 1,
        role: ArtistRole.PERFORMER,
      },
      {
        artistId: artists[1].id,
        albumId: albums[1].id,
        order: 0,
        role: ArtistRole.COMPOSER,
      },
    ],
  })

  // Artists on Songs

  await prisma.artistsOnSongs.createMany({
    data: [
      {
        songId: songs[0].id,
        artistId: artists[0].id,
        order: 0,
        role: ArtistRole.COMPOSER,
      },
      {
        songId: songs[0].id,
        artistId: artists[1].id,
        order: 1,
        role: ArtistRole.PERFORMER,
      },
      {
        songId: songs[1].id,
        artistId: artists[0].id,
        order: 0,
        role: ArtistRole.COMPOSER,
      },
      {
        songId: songs[2].id,
        artistId: artists[0].id,
        order: 0,
        role: ArtistRole.COMPOSER,
      },
      {
        songId: songs[3].id,
        artistId: artists[1].id,
        order: 0,
        role: ArtistRole.COMPOSER,
      },
      {
        songId: songs[4].id,
        artistId: artists[1].id,
        order: 0,
        role: ArtistRole.COMPOSER,
      },
    ],
  })

  // Genres on Songs

  await prisma.genresOnSongs.createMany({
    data: [
      { songId: songs[0].id, genreId: genres[0].id, order: 0 },
      { songId: songs[0].id, genreId: genres[1].id, order: 1 },
      { songId: songs[1].id, genreId: genres[1].id, order: 0 },
      { songId: songs[2].id, genreId: genres[2].id, order: 0 },
      { songId: songs[3].id, genreId: genres[3].id, order: 0 },
      { songId: songs[4].id, genreId: genres[4].id, order: 0 },
    ],
  })

  // Songs on Albums

  await prisma.songsOnAlbums.createMany({
    data: [
      {
        songId: songs[0].id,
        albumId: albums[0].id,
        order: 0,
      },
      {
        songId: songs[1].id,
        albumId: albums[0].id,
        order: 1,
      },
      {
        songId: songs[2].id,
        albumId: albums[0].id,
        order: 2,
      },
      {
        songId: songs[3].id,
        albumId: albums[1].id,
        order: 0,
      },
      {
        songId: songs[4].id,
        albumId: albums[1].id,
        order: 1,
      },
    ],
  })

  // Users on Playlists

  await prisma.usersOnPlaylists.createMany({
    data: [
      {
        userId: users[0].id,
        playlistId: playlist!.id,
        isCreator: true,
      },
      {
        userId: users[1].id,
        playlistId: playlist!.id,
        isCreator: false,
      },
    ],
  })

  // Songs on Playlists

  return prisma.songsOnPlaylists.createMany({
    data: [{ songId: songs[0].id, playlistId: playlist!.id, order: 0 }],
  })
}

async function clearDatabase() {
  await prisma.artistsOnAlbums.deleteMany()
  await prisma.artistsOnSongs.deleteMany()
  await prisma.genresOnSongs.deleteMany()
  await prisma.likedSongs.deleteMany()
  await prisma.songsOnAlbums.deleteMany()
  await prisma.songsOnPlaylists.deleteMany()
  await prisma.usersOnPlaylists.deleteMany()
  await prisma.usersOnUsers.deleteMany()
  await prisma.album.deleteMany()
  await prisma.artist.deleteMany()
  await prisma.genre.deleteMany()
  await prisma.playlist.deleteMany()
  await prisma.song.deleteMany()
  return prisma.user.deleteMany()
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
