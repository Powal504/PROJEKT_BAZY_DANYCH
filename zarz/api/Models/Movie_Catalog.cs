using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Movie_Catalog
    {
        [Key]
        public int Movie_catalog_id { get; set; }
        public int User_id { get; set; }
        [ForeignKey("User_id")]
        public Users User { get; set; }
        public string? Catalog_name { get; set; }
    }
}