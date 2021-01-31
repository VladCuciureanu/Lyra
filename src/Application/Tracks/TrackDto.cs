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
            Artists = new List<Artist>();
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public bool Explicit { get; set; }

        public int DurationMs { get; set; }

        public int TrackNumber { get; set; }

        public int DiscNumber { get; set; }

        public int Popularity { get; set; }

        public SimplifiedAlbumDto Album { get; set; }

        public IList<Artist> Artists { get; private set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Track, TrackDto>()
                .ForMember(d => d.Album, opt => opt.MapFrom(s => s.Album));
        }
    }
}