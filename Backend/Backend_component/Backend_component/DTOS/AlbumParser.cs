using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_component.DTOS
{
    public class AlbumParser
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public List<songParser> Songs { get; set; }
    }
}
