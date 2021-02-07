using System.Collections.Generic;
using Lyra.Application.Common.Mappings;
using Lyra.Domain.Entities;

namespace Lyra.Application.Artists
{
    public class ArtistDto : IMapFrom<Artist>
    {
        public ArtistDto()
        {
            Genres = new List<Genre>();
            Images = new List<Image>();
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public int Popularity { get; set; }

        public IList<Genre> Genres { get; }

        public IList<Image> Images { get; }
    }
}