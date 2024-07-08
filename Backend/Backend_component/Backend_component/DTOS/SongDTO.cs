using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_component.DTOS
{
    public class SongDTO
    {
        public int id { get; set; }
        public string Title { get; set; }
        public string Length { get; set; }
        public int? Albumid { get; set; }
    }
}
