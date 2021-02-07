using System.Collections.Generic;
using AutoMapper;
using Lyra.Application.Albums;
using Lyra.Application.Artists;
using Lyra.Application.Common.Mappings;
using Lyra.Domain.Entities;

namespace Lyra.Application.Tracks
{
    public class TrackDto : IMapFrom<Track>
    {
        public TrackDto()
        {
            Artists = new List<ArtistDto>();
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public bool Explicit { get; set; }

        public int DurationMs { get; set; }

        public int TrackNumber { get; set; }

        public int DiscNumber { get; set; }

        public int Popularity { get; set; }

        public SimplifiedAlbumDto Album { get; set; }

        public IList<ArtistDto> Artists { get; private set; }
    }
}