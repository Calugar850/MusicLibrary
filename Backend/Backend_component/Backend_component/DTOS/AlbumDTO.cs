﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_component.DTOS
{
    public class AlbumDTO
    {
        public int id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int? Artistid { get; set; }
    }
}
