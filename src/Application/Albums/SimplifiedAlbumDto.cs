using System;
using System.Collections.Generic;
using AutoMapper;
using Lyra.Application.Artists;
using Lyra.Application.Common.Mappings;
using Lyra.Domain.Entities;

namespace Lyra.Application.Albums
{
    public class SimplifiedAlbumDto : IMapFrom<Album>
    {
        public SimplifiedAlbumDto()
        {
            Artists = new List<SimplifiedArtistDto>();
            Images = new List<Image>();
        }

        public int Id { get; set; }

        public string Name { get; set; }

        public int AlbumType { get; set; }

        public DateTime? ReleaseDate { get; set; }

        public IList<SimplifiedArtistDto> Artists { get; private set; }

        public IList<Image> Images { get; private set; }
    }
}