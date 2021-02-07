using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Lyra.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Lyra.Application.Albums.Queries.GetAlbum
{
    public class GetAlbumQuery : IRequest<AlbumDto>
    {
        [Required] public int Id { get; set; }
    }

    public class GetAlbumQueryHandler : IRequestHandler<GetAlbumQuery, AlbumDto>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetAlbumQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<AlbumDto> Handle(GetAlbumQuery request, CancellationToken cancellationToken)
        {
            var album = await _context.Albums
                .Include(e => e.Artists)
                .Include(e => e.Images)
                .Include(e => e.Genres)
                .Include(e => e.Tracks)
                .ThenInclude(t => t.Artists)
                .SingleOrDefaultAsync(e => e.Id.Equals(request.Id), cancellationToken);
            return _mapper.Map<AlbumDto>(album);
        }
    }
}