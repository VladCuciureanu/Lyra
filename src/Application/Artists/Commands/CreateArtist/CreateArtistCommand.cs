using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using Lyra.Application.Common.Interfaces;
using Lyra.Domain.Entities;
using Lyra.Domain.Events;
using MediatR;

namespace Lyra.Application.Artists.Commands.CreateArtist
{
    public class CreateArtistCommand : IRequest<int>
    {
        [Required] public string Name { get; set; }
    }

    public class CreateArtistCommandHandler : IRequestHandler<CreateArtistCommand, int>
    {
        private readonly IApplicationDbContext _context;

        public CreateArtistCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(CreateArtistCommand request, CancellationToken cancellationToken)
        {
            var entity = new Artist
            {
                Name = request.Name
            };

            entity.DomainEvents.Add(new ArtistCreatedEvent(entity));

            await _context.Artists.AddAsync(entity, cancellationToken);

            await _context.SaveChangesAsync(cancellationToken);

            return entity.Id;
        }
    }
}