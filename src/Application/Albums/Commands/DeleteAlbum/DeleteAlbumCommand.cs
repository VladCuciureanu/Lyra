using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using Lyra.Application.Common.Exceptions;
using Lyra.Application.Common.Interfaces;
using Lyra.Domain.Entities;
using MediatR;

namespace Lyra.Application.Albums.Commands.DeleteAlbum
{
    public class DeleteAlbumCommand : IRequest
    {
        [Required] public int Id { get; set; }
    }

    public class DeleteAlbumCommandHandler : IRequestHandler<DeleteAlbumCommand>
    {
        private readonly IApplicationDbContext _context;

        public DeleteAlbumCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(DeleteAlbumCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.Albums.FindAsync(request.Id);

            if (entity == null)
            {
                throw new NotFoundException(nameof(Album), request.Id);
            }

            _context.Albums.Remove(entity);

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}