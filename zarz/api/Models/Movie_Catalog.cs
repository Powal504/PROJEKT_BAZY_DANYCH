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
        public string User_id { get; set; }
        
        public ICollection<Movie_Movie_Catalog> MovieMovieCatalogs { get; set; }
        
        [ForeignKey("User_id")]
        public Users User { get; set; }
        
        public string? Catalog_name { get; set; }
        public ICollection<Movie_Movie_Catalog> MovieMovieCatalogs { get; set; }
        
    }
}