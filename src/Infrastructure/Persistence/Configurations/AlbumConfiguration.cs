using Lyra.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Lyra.Infrastructure.Persistence.Configurations
{
    public class AlbumConfiguration : IEntityTypeConfiguration<Album>
    {
        public void Configure(EntityTypeBuilder<Album> builder)
        {
            builder.Ignore(e => e.DomainEvents);

            builder.Property(e => e.Name)
                .HasMaxLength(200)
                .IsRequired();

            builder.Property(e => e.AlbumType)
                .IsRequired();

            builder.Property(e => e.Popularity)
                .IsRequired();

            builder.HasMany(e => e.Artists)
                .WithMany(e => e.Albums);

            builder.HasMany(e => e.Genres);

            builder.HasMany(e => e.Images);

            builder.HasMany(e => e.Tracks)
                .WithOne(e => e.Album);
        }
    }
}