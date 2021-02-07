using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using Lyra.Application.Common.Interfaces;
using Lyra.Domain.Entities;
using Lyra.Domain.Events;
using MediatR;

namespace Lyra.Application.Tracks.Commands.CreateTrack
{
    public class CreateTrackCommand : IRequest<int>
    {
        [Required] public string Name { get; set; }
        [Required] public bool Explicit { get; set; }
        [Required] public int DurationMs { get; set; }
        [Required] public string DataPath { get; set; }
        [Required] public int TrackNumber { get; set; }
        [Required] public int DiscNumber { get; set; }
    }

    public class CreateTrackCommandHandler : IRequestHandler<CreateTrackCommand, int>
    {
        private readonly IApplicationDbContext _context;

        public CreateTrackCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(CreateTrackCommand request, CancellationToken cancellationToken)
        {
            var entity = new Track
            {
                Name = request.Name,
                Explicit = request.Explicit,
                DurationMs = request.DurationMs,
                DataPath = request.DataPath,
                TrackNumber = request.TrackNumber,
                DiscNumber = request.DiscNumber
            };

            entity.DomainEvents.Add(new TrackCreatedEvent(entity));

            await _context.Tracks.AddAsync(entity, cancellationToken);

            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}