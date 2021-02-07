using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Lyra.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Lyra.Application.Artists.Queries.GetArtist
{
    public class GetArtistQuery : IRequest<ArtistDto>
    {
        [Required] public int Id { get; set; }
    }

    public class GetArtistQueryHandler : IRequestHandler<GetArtistQuery, ArtistDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetArtistQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<ArtistDto> Handle(GetArtistQuery request, CancellationToken cancellationToken)
        {
            var artist = await _context.Artists
                .Include(e => e.Images)
                .Include(e => e.Genres)
                .SingleOrDefaultAsync(e => e.Id.Equals(request.Id), cancellationToken);
            return _mapper.Map<ArtistDto>(artist);
        }
    }
}