using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Movie_Catalog
    {
        [Key]
        public int Movie_catalog_id { get; set; }
        public int UserId { get; set; }
        public Users User { get; set; }
        public string? Catalog_name { get; set; }
    }
}