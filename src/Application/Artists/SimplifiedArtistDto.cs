using Lyra.Application.Common.Mappings;
using Lyra.Domain.Entities;

namespace Lyra.Application.Artists
{
    public class SimplifiedArtistDto : IMapFrom<Artist>
    {
        public int Id { get; set; }

        public string Name { get; set; }
    }
}