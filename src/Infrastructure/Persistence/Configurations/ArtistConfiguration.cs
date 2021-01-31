using Lyra.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Lyra.Infrastructure.Persistence.Configurations
{
    public class ArtistConfiguration : IEntityTypeConfiguration<Artist>
    {
        public void Configure(EntityTypeBuilder<Artist> builder)
        {
            builder.Ignore(e => e.DomainEvents);

            builder.HasKey(e => e.Id);

            builder.Property(e => e.Name)
                .HasMaxLength(200)
                .IsRequired();

            builder.Property(e => e.Popularity)
                .IsRequired();

            builder.HasMany(e => e.Albums)
                .WithMany(e => e.Artists);

            builder.HasMany(e => e.Genres);

            builder.HasMany(e => e.Images);

            builder.HasMany(e => e.Tracks)
                .WithMany(e => e.Artists);
        }
    }
}