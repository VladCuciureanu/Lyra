using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Lyra.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Lyra.Application.Tracks.Queries.GetTrack
{
    public class GetTrackQuery : IRequest<TrackDto>
    {
        [Required] public int Id { get; set; }
    }

    public class GetTrackQueryHandler : IRequestHandler<GetTrackQuery, TrackDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetTrackQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<TrackDto> Handle(GetTrackQuery request, CancellationToken cancellationToken)
        {
            var track = await _context.Tracks
                .Include(e => e.Album).ThenInclude(t => t.Images)
                .Include(e => e.Album).ThenInclude(t => t.Artists)
                .Include(e => e.Artists).ThenInclude(a => a.Genres)
                .Include(e => e.Artists).ThenInclude(a => a.Images)
                .SingleOrDefaultAsync(e => e.Id.Equals(request.Id), cancellationToken);
            return _mapper.Map<TrackDto>(track);
        }
    }
}