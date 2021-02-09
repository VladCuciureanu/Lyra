using System;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using Lyra.Application.Common.Exceptions;
using Lyra.Application.Common.Interfaces;
using Lyra.Domain.Entities;
using Lyra.Domain.Enums;
using MediatR;

namespace Lyra.Application.Albums.Commands.UpdateAlbum
{
    public class UpdateAlbumCommand : IRequest
    {
        [Required] public int Id { get; set; }

        public string Name { get; set; }

        public AlbumType? AlbumType { get; set; }

        public DateTime? ReleaseDate { get; set; }

        public int? Popularity { get; set; }
    }

    public class UpdateAlbumCommandHandler : IRequestHandler<UpdateAlbumCommand>
    {
        private readonly IApplicationDbContext _context;

        public UpdateAlbumCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(UpdateAlbumCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.Albums.FindAsync(request.Id);

            if (entity == null)
            {
                throw new NotFoundException(nameof(Album), request.Id);
            }

            if (!string.IsNullOrEmpty(request.Name))
                entity.Name = request.Name;

            if (request.AlbumType.HasValue)
                entity.AlbumType = request.AlbumType.Value;
            
            if (request.ReleaseDate.HasValue)
                entity.ReleaseDate = request.ReleaseDate.Value;
            
            if (request.Popularity.HasValue)
                entity.Popularity = request.Popularity.Value;

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}