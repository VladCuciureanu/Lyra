using System.Threading;
using System.Threading.Tasks;
using Lyra.Application.Common.Models;
using Lyra.Domain.Events;
using MediatR;
using Microsoft.Extensions.Logging;

namespace Lyra.Application.Albums.EventHandlers
{
    public class AlbumCreatedEventHandler : INotificationHandler<DomainEventNotification<AlbumCreatedEvent>>
    {
        private readonly ILogger<AlbumCreatedEventHandler> _logger;

        public AlbumCreatedEventHandler(ILogger<AlbumCreatedEventHandler> logger)
        {
            _logger = logger;
        }

        public Task Handle(DomainEventNotification<AlbumCreatedEvent> notification, CancellationToken cancellationToken)
        {
            var domainEvent = notification.DomainEvent;

            _logger.LogInformation("Lyra Domain Event: {DomainEvent}", domainEvent.GetType().Name);

            return Task.CompletedTask;
        }
    }
}