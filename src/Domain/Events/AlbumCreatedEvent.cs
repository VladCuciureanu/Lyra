using Lyra.Domain.Common;
using Lyra.Domain.Entities;

namespace Lyra.Domain.Events
{
    public class AlbumCreatedEvent : DomainEvent
    {
        public AlbumCreatedEvent(Album item)
        {
            Item = item;
        }

        public Album Item { get; }
    }
}