using System;
using System.Collections.Generic;
using Lyra.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Threading.Tasks;
using Lyra.Domain.Entities;
using Lyra.Domain.Enums;

namespace Lyra.Infrastructure.Persistence
{
    public static class ApplicationDbContextSeed
    {
        public static async Task SeedDefaultUserAsync(UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager)
        {
            var administratorRole = new IdentityRole("Administrator");

            if (roleManager.Roles.All(r => r.Name != administratorRole.Name))
            {
                await roleManager.CreateAsync(administratorRole);
            }

            var administrator = new ApplicationUser
                {UserName = "administrator@localhost", Email = "administrator@localhost"};

            if (userManager.Users.All(u => u.UserName != administrator.UserName))
            {
                await userManager.CreateAsync(administrator, "Administrator1!");
                await userManager.AddToRolesAsync(administrator, new[] {administratorRole.Name});
            }
        }

        public static async Task SeedSampleDataAsync(ApplicationDbContext context)
        {
            var artists = new List<Artist>()
            {
                new Artist()
                {
                    Id = 1,
                    Name = "Shakespeare",
                    Popularity = 100,
                    Images =
                    {
                        new Image()
                        {
                            Height = 1024,
                            Width = 1024,
                            Url = "foo.com"
                        },
                        new Image()
                        {
                            Height = 512,
                            Width = 512,
                            Url = "bar.com"
                        }
                    },
                    Genres =
                    {
                        new Genre()
                        {
                            Name = "Rock"
                        },
                        new Genre()
                        {
                            Name = "Punk Rock"
                        }
                    }
                },
                new Artist()
                {
                    Id = 2,
                    Name = "Leonardo da Vinci",
                    Popularity = 50,
                    Images =
                    {
                        new Image()
                        {
                            Height = 2048,
                            Width = 2048,
                            Url = "baz.com"
                        },
                        new Image()
                        {
                            Height = 256,
                            Width = 256,
                            Url = "qux.com"
                        }
                    },
                    Genres =
                    {
                        new Genre()
                        {
                            Name = "Occult Hymn"
                        },
                        new Genre()
                        {
                            Name = "Funk"
                        }
                    }
                }
            };

            var albums = new List<Album>()
            {
                new Album()
                {
                    Id = 1,
                    Name = "Hamlet",
                    AlbumType = AlbumType.Album,
                    ReleaseDate = DateTime.Parse("01-01-2016"),
                    Popularity = 100,
                    Genres =
                    {
                        new Genre()
                        {
                            Name = "A"
                        }
                    },
                    Images =
                    {
                        new Image()
                        {
                            Height = 100,
                            Width = 100,
                            Url = "yeeeeet.com/img1.com"
                        }
                    }
                },
                new Album()
                {
                    Id = 2,
                    Name = "Romeo And Juliet",
                    AlbumType = AlbumType.Single,
                    ReleaseDate = DateTime.Parse("01-01-2017"),
                    Popularity = 99,
                    Genres =
                    {
                        new Genre()
                        {
                            Name = "B"
                        }
                    },
                    Images =
                    {
                        new Image()
                        {
                            Height = 200,
                            Width = 200,
                            Url = "yeeeeet.com/img2.com"
                        }
                    }
                },
                new Album()
                {
                    Id = 3,
                    Name = "Othello",
                    AlbumType = AlbumType.Compilation,
                    ReleaseDate = DateTime.Parse("01-01-2019"),
                    Popularity = 98,
                    Genres =
                    {
                        new Genre()
                        {
                            Name = "C"
                        }
                    },
                    Images =
                    {
                        new Image()
                        {
                            Height = 300,
                            Width = 300,
                            Url = "yeeeeet.com/img3.com"
                        }
                    }
                }
            };

            var tracks = new List<Track>()
            {
                new Track()
                {
                    Id = 1,
                    Name = "Hamlet",
                    Explicit = false,
                    DurationMs = 1001,
                    DataPath = "yeet.com/1.mp4",
                    TrackNumber = 1,
                    DiscNumber = 1,
                    Popularity = 99
                },
                new Track()
                {
                    Id = 2,
                    Name = "Romeo And Juliet",
                    Explicit = false,
                    DurationMs = 1002,
                    DataPath = "yeet.com/2.mp4",
                    TrackNumber = 2,
                    DiscNumber = 1,
                    Popularity = 98
                },
                new Track()
                {
                    Id = 3,
                    Name = "Othello",
                    Explicit = false,
                    DurationMs = 1003,
                    DataPath = "yeet.com/3.mp4",
                    TrackNumber = 3,
                    DiscNumber = 1,
                    Popularity = 97
                },
                new Track()
                {
                    Id = 4,
                    Name = "The Tempest",
                    Explicit = false,
                    DurationMs = 1004,
                    DataPath = "yeet.com/4.mp4",
                    TrackNumber = 4,
                    DiscNumber = 1,
                    Popularity = 96
                },
                new Track()
                {
                    Id = 5,
                    Name = "Double Falsehood",
                    Explicit = false,
                    DurationMs = 1005,
                    DataPath = "yeet.com/5.mp4",
                    TrackNumber = 5,
                    DiscNumber = 1,
                    Popularity = 95
                },
            };

            artists.ForEach(e => context.Artists.AddAsync(e));
            albums.ForEach(e => context.Albums.AddAsync(e));
            tracks.ForEach(e => context.Tracks.AddAsync(e));

            await context.SaveChangesAsync();

            // Wild stuff from here if I say so myself

            // Album 1
            var artist = await context.Artists.FindAsync(1);
            var album = await context.Albums.FindAsync(1);
            var track = await context.Tracks.FindAsync(1);
            album.Artists.Add(artist);
            album.Tracks.Add(track);
            track.Artists.Add(artist);
            track = await context.Tracks.FindAsync(2);
            track.Artists.Add(artist);
            album.Tracks.Add(track);

            // Album 2
            track = await context.Tracks.FindAsync(3);
            track.Artists.Add(artist);
            album = await context.Albums.FindAsync(2);
            album.Artists.Add(artist);
            artist = await context.Artists.FindAsync(2);
            album.Artists.Add(artist);
            track.Artists.Add(artist);
            album.Tracks.Add(track);

            // Album 3
            album = await context.Albums.FindAsync(3);
            track = await context.Tracks.FindAsync(4);
            album.Artists.Add(artist);
            track.Artists.Add(artist);
            album.Tracks.Add(track);
            track = await context.Tracks.FindAsync(5);
            track.Artists.Add(artist);
            album.Tracks.Add(track);

            await context.SaveChangesAsync();
        }
    }
}