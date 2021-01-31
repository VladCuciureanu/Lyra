using System;
using System.Collections.Generic;
using AutoMapper;
using Lyra.Application.Common.Mappings;
using Lyra.Domain.Entities;

namespace Lyra.Application.Albums
{
    public class SimplifiedAlbumDto : IMapFrom<Album>
    {
        public SimplifiedAlbumDto()
        {
            Images = new List<Image>();
        }
        
        public int Id { get; set; }

        public string Name { get; set; }

        public int AlbumType { get; set; }

        public DateTime? ReleaseDate { get; set; }
        
        public int Popularity { get; set; }
        
        public IList<Image> Images { get; private set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<Album, AlbumDto>()
                .ForMember(d => d.AlbumType, opt => opt.MapFrom(s => (int) s.AlbumType));
        }
    }
}