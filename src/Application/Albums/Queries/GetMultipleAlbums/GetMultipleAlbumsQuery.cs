using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Lyra.Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Lyra.Application.Albums.Queries.GetMultipleAlbums
{
    public class GetMultipleAlbumsQuery : IRequest<List<AlbumDto>>
    {
        [Required] public List<int> Ids { get; set; }
    }

    public class GetMultipleAlbumsQueryHandler : IRequestHandler<GetMultipleAlbumsQuery, List<AlbumDto>>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetMultipleAlbumsQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<AlbumDto>> Handle(GetMultipleAlbumsQuery request, CancellationToken cancellationToken)
        {
            var result = new List<AlbumDto>();
            
            foreach (var requestId in request.Ids)
            {
                var album = await _context.Albums
                    .Include(e => e.Artists)
                    .Include(e => e.Images)
                    .Include(e => e.Genres)
                    .Include(e => e.Tracks)
                    .ThenInclude(t => t.Artists)
                    .SingleOrDefaultAsync(e => e.Id.Equals(requestId));

                result.Add(_mapper.Map<AlbumDto>(album));
            }

            return result;
        }
    }
}