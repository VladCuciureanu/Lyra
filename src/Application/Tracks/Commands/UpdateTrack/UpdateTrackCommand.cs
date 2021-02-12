using System;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using Lyra.Application.Common.Exceptions;
using Lyra.Application.Common.Interfaces;
using Lyra.Domain.Entities;
using Lyra.Domain.Enums;
using MediatR;

namespace Lyra.Application.Tracks.Commands.UpdateTrack
{
    public class UpdateTrackCommand : IRequest
    {
        [Required] public int Id { get; set; }

        public string Name { get; set; }

        public bool? Explicit { get; set; }

        public int? DurationMs { get; set; }

        public string DataPath { get; set; }

        public int? TrackNumber { get; set; }

        public int? DiscNumber { get; set; }

        public int? Popularity { get; set; }
    }

    public class UpdateTrackCommandHandler : IRequestHandler<UpdateTrackCommand>
    {
        private readonly IApplicationDbContext _context;

        public UpdateTrackCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(UpdateTrackCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.Tracks.FindAsync(request.Id);

            if (entity == null)
            {
                throw new NotFoundException(nameof(Track), request.Id);
            }

            if (!string.IsNullOrEmpty(request.Name))
                entity.Name = request.Name;
            
            if (request.Explicit.HasValue)
                entity.Explicit = request.Explicit.Value;
            
            if (request.DurationMs.HasValue)
                entity.DurationMs = request.DurationMs.Value;
            
            if (!string.IsNullOrEmpty(request.DataPath))
                entity.DataPath = request.DataPath;

            if (request.TrackNumber.HasValue)
                entity.TrackNumber = request.TrackNumber.Value;
            
            if (request.DiscNumber.HasValue)
                entity.DiscNumber = request.DiscNumber.Value;
            
            if (request.Popularity.HasValue)
                entity.Popularity = request.Popularity.Value;

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}