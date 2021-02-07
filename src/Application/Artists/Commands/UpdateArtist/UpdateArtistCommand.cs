using System;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using Lyra.Application.Common.Exceptions;
using Lyra.Application.Common.Interfaces;
using Lyra.Domain.Entities;
using MediatR;

namespace Lyra.Application.Artists.Commands.UpdateArtist
{
    public class UpdateArtistCommand : IRequest
    {
        [Required] public int Id { get; set; }

        public string Name { get; set; }
        
        public int? Popularity { get; set; }
    }

    public class UpdateArtistCommandHandler : IRequestHandler<UpdateArtistCommand>
    {
        private readonly IApplicationDbContext _context;

        public UpdateArtistCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Unit> Handle(UpdateArtistCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.Artists.FindAsync(request.Id);

            if (entity == null)
            {
                throw new NotFoundException(nameof(Artist), request.Id);
            }

            if (!string.IsNullOrEmpty(request.Name))
                entity.Name = request.Name;

            if (request.Popularity.HasValue)
                entity.Popularity = request.Popularity.Value;

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}