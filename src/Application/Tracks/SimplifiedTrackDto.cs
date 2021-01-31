using System.Collections.Generic;
using Lyra.Application.Artists;
using Lyra.Application.Common.Mappings;
using Lyra.Domain.Entities;

namespace Lyra.Application.Tracks
{
    public class SimplifiedTrackDto : IMapFrom<Track>
    {
        public SimplifiedTrackDto()
        {
            Artists = new List<SimplifiedArtistDto>();
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public bool Explicit { get; set; }

        public int DurationMs { get; set; }

        public int TrackNumber { get; set; }

        public int DiscNumber { get; set; }

        public IList<SimplifiedArtistDto> Artists { get; private set; }
    }
}