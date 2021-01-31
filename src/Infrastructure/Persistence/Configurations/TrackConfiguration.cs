using Lyra.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Lyra.Infrastructure.Persistence.Configurations
{
    public class TrackConfiguration : IEntityTypeConfiguration<Track>
    {
        public void Configure(EntityTypeBuilder<Track> builder)
        {
            builder.Ignore(e => e.DomainEvents);

            builder.HasKey(e => e.Id);

            builder.Property(e => e.Name)
                .HasMaxLength(200)
                .IsRequired();

            builder.Property(e => e.Explicit)
                .IsRequired();

            builder.Property(e => e.DurationMs)
                .IsRequired();

            builder.Property(e => e.DataPath)
                .IsRequired();

            builder.Property(e => e.TrackNumber)
                .IsRequired();

            builder.Property(e => e.DiscNumber)
                .IsRequired();

            builder.Property(e => e.Popularity)
                .IsRequired();

            builder.HasOne(e => e.Album)
                .WithMany(e => e.Tracks);

            builder.HasMany(e => e.Artists)
                .WithMany(e => e.Tracks);
        }
    }
}