using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using Lyra.Application.Common.Exceptions;
using Lyra.Application.Common.Interfaces;
using Lyra.Domain.Entities;
using MediatR;

namespace Lyra.Application.Tracks.Commands.DeleteTrack
{
    public class DeleteTrackCommand : IRequest
    {
        [Required] public int Id { get; set; }
    }

    public class DeleteTrackCommandHandler : IRequestHandler<DeleteTrackCommand>
    {
        private readonly IApplicationDbContext _context;

        public DeleteTrackCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(DeleteTrackCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.Tracks.FindAsync(request.Id);

            if (entity == null)
            {
                throw new NotFoundException(nameof(Track), request.Id);
            }

            _context.Tracks.Remove(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}