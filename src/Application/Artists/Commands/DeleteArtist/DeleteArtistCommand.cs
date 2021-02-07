using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using Lyra.Application.Common.Exceptions;
using Lyra.Application.Common.Interfaces;
using Lyra.Domain.Entities;
using MediatR;

namespace Lyra.Application.Artists.Commands.DeleteArtist
{
    public class DeleteArtistCommand : IRequest
    {
        [Required] public int Id { get; set; }
    }

    public class DeleteArtistCommandHandler : IRequestHandler<DeleteArtistCommand>
    {
        private readonly IApplicationDbContext _context;

        public DeleteArtistCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(DeleteArtistCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.Artists.FindAsync(request.Id);

            if (entity == null)
            {
                throw new NotFoundException(nameof(Artist), request.Id);
            }

            _context.Artists.Remove(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}