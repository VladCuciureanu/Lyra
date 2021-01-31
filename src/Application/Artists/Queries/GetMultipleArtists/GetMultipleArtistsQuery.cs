using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Lyra.Application.Common.Interfaces;
using Lyra.Application.Common.Mappings;
using Lyra.Application.Common.Models;
using Lyra.Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Lyra.Application.Artists.Queries.GetMultipleArtists
{
    public class GetMultipleArtistsQuery : IRequest<List<ArtistDto>>
    {
        [Required] public List<int> Ids { get; set; }
    }

    public class GetMultipleArtistsQueryHandler : IRequestHandler<GetMultipleArtistsQuery, List<ArtistDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetMultipleArtistsQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<ArtistDto>> Handle(GetMultipleArtistsQuery request, CancellationToken cancellationToken)
        {
            var result = new List<ArtistDto>();
            
            foreach (var requestId in request.Ids)
            {
                var artist = await _context.Artists
                    .Include(e => e.Images)
                    .Include(e => e.Genres)
                    .SingleOrDefaultAsync(e => e.Id.Equals(requestId));

                result.Add(_mapper.Map<ArtistDto>(artist));
            }

            return result;
        }
    }
}