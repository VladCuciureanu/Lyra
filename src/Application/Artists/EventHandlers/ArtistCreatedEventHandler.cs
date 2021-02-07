using System.Threading;
using System.Threading.Tasks;
using Lyra.Application.Common.Models;
using Lyra.Domain.Events;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Lyra.Application.Artists.EventHandlers
{
    public class ArtistCreatedEventHandler : INotificationHandler<DomainEventNotification<ArtistCreatedEvent>>
    {
        private readonly ILogger<ArtistCreatedEventHandler> _logger;

        public ArtistCreatedEventHandler(ILogger<ArtistCreatedEventHandler> logger)
        {
            _logger = logger;
        }

        public Task Handle(DomainEventNotification<ArtistCreatedEvent> notification, CancellationToken cancellationToken)
        {
            var domainEvent = notification.DomainEvent;

            _logger.LogInformation("Lyra Domain Event: {DomainEvent}", domainEvent.GetType().Name);

            return Task.CompletedTask;
        }
    }
}