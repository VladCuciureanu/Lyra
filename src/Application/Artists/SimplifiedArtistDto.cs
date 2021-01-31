using System.Collections.Generic;
using Lyra.Application.Common.Mappings;
using Lyra.Domain.Entities;

namespace Lyra.Application.Artists
{
    public class SimplifiedArtistDto : IMapFrom<Artist>
    {
        public SimplifiedArtistDto()
        {
            Images = new List<Image>();
        }
        
        public int Id { get; set; }

        public string Name { get; set; }

        public int Popularity { get; set; }

        public IList<Image> Images { get; private set; }
    }
}