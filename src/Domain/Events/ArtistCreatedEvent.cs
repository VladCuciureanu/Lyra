using Lyra.Domain.Common;
using Lyra.Domain.Entities;

namespace Lyra.Domain.Events
{
    public class ArtistCreatedEvent : DomainEvent
    {
        public ArtistCreatedEvent(Artist item)
        {
            Item = item;
        }

        public Artist Item { get; }
    }
}