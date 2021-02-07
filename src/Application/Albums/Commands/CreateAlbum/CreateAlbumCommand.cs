using System;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using Lyra.Application.Common.Interfaces;
using Lyra.Domain.Entities;
using Lyra.Domain.Enums;
using Lyra.Domain.Events;
using MediatR;

namespace Lyra.Application.Albums.Commands.CreateAlbum
{
    public class CreateAlbumCommand : IRequest<int>
    {
        [Required] public string Name { get; set; }
        [Required] public AlbumType AlbumType { get; set; }
        public DateTime? ReleaseDate { get; set; }
    }

    public class CreateAlbumCommandHandler : IRequestHandler<CreateAlbumCommand, int>
    {
        private readonly IApplicationDbContext _context;

        public CreateAlbumCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(CreateAlbumCommand request, CancellationToken cancellationToken)
        {
            var entity = new Album
            {
                Name = request.Name,
                AlbumType = request.AlbumType,
                ReleaseDate = request.ReleaseDate
            };

            entity.DomainEvents.Add(new AlbumCreatedEvent(entity));

            await _context.Albums.AddAsync(entity, cancellationToken);

            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}