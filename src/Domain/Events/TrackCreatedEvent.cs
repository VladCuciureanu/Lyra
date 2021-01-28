using Lyra.Domain.Common;
using Lyra.Domain.Entities;

namespace Lyra.Domain.Events
{
    public class TrackCreatedEvent : DomainEvent
    {
        public TrackCreatedEvent(Track item)
        {
            Item = item;
        }

        public Track Item { get; }
    }
}