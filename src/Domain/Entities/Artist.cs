using System.Collections.Generic;
using Lyra.Domain.Common;

// ReSharper disable CollectionNeverUpdated.Global

namespace Lyra.Domain.Entities
{
    public class Artist : AuditableEntity, IHasDomainEvent
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int Popularity { get; set; }

        public IList<Album> Albums { get; } = new List<Album>();

        public IList<Genre> Genres { get; } = new List<Genre>();

        public IList<Image> Images { get; } = new List<Image>();

        public IList<Track> Tracks { get; } = new List<Track>();

        public List<DomainEvent> DomainEvents { get; set; } = new List<DomainEvent>();
    }
}