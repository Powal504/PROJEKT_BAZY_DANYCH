using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Genres
    {
        [Key]
        public int Genre_id { get; set; }
        public string? Genre_name { get; set; }
        public ICollection<Genres_Movies> GenresMovies { get; set; }

    }
}