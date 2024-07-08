using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Backend_component.Models
{
    public class Song
    {
        [Key]
        public int id { get; set; }
        public string Title { get; set; }
        public string Length { get; set; }
        public int? Albumid { get; set; }
    }
}
