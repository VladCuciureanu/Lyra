using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Lyra.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Lyra.Application.Tracks.Queries.GetMultipleTracks
{
    public class GetMultipleTracksQuery : IRequest<List<TrackDto>>
    {
        [Required] public List<int> Ids { get; set; }
    }

    public class GetMultipleTracksQueryHandler : IRequestHandler<GetMultipleTracksQuery, List<TrackDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetMultipleTracksQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<TrackDto>> Handle(GetMultipleTracksQuery request, CancellationToken cancellationToken)
        {
            var result = new List<TrackDto>();

            foreach (var requestId in request.Ids)
            {
                var track = await _context.Tracks
                    .Include(e => e.Album).ThenInclude(t => t.Images)
                    .Include(e => e.Album).ThenInclude(t => t.Artists)
                    .Include(e => e.Artists).ThenInclude(a => a.Genres)
                    .Include(e => e.Artists).ThenInclude(a => a.Images)
                    .SingleOrDefaultAsync(e => e.Id.Equals(requestId));

                result.Add(_mapper.Map<TrackDto>(track));
            }

            return result;
        }
    }
}