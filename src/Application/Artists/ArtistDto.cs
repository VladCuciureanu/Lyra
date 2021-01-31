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
            Images = new List<Image>();
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public int Popularity { get; set; }

        public IList<Image> Images { get; private set; }
    }
}