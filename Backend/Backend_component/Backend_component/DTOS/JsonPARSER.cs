using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_component.DTOS
{
    public class JsonPARSER
    {
        public string Name { get; set; }
        public List<AlbumDTO> Albums { get; set; }
    }
}
