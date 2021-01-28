using System.Collections.Generic;
using Lyra.Domain.Common;

namespace Lyra.Domain.Entities
{
    public class Track : AuditableEntity, IHasDomainEvent
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public bool Explicit { get; set; }

        public int DurationMs { get; set; }

        public string DataPath { get; set; }

        public int TrackNumber { get; set; }

        public int DiscNumber { get; set; }

        public int Popularity { get; set; }

        public Album Album { get; set; }

        public IList<Artist> Artists { get; private set; } = new List<Artist>();

        public List<DomainEvent> DomainEvents { get; set; } = new List<DomainEvent>();
    }
}