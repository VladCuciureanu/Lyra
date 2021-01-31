using System.Collections.Generic;
using Lyra.Application.Albums;
using Lyra.Application.Common.Mappings;
using Lyra.Application.Tracks;
using Lyra.Domain.Entities;

namespace Lyra.Application.Artists
{
    public class ArtistDto : IMapFrom<Artist>
    {
        public ArtistDto()
        {
            Albums = new List<SimplifiedAlbumDto>();
            Images = new List<Image>();
            Tracks = new List<SimplifiedTrackDto>();
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public int Popularity { get; set; }

        public IList<SimplifiedAlbumDto> Albums { get; private set; }

        public IList<Image> Images { get; private set; }

        public IList<SimplifiedTrackDto> Tracks { get; private set; }
    }
}