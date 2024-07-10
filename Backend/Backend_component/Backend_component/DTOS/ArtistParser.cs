using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_component.DTOS
{
    public class ArtistParser
    {
        public string Name { get; set; }
        public List<AlbumParser> Albums { get; set; }
    }
}
