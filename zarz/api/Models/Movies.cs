using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Movies
    {
        [Key]
        public int Movie_id { get; set; }
        public string? Title { get; set; }
        public DateTime? Release_date { get; set; }
        public string? Description { get; set; }
        public byte[]? Avatar { get; set; }
        public ICollection<Genres_Movies> GenresMovies { get; set; }
        public ICollection<Directors_Movies> DirectorsMovies { get; set; }
        public ICollection<Movie_Production_Companies> MovieProductionCompanies { get; set; }
        public ICollection<Movie_Movie_Catalog> MovieMovieCatalogs { get; set; }
        public ICollection<Actors_Movies> Actors_Movies { get; set; }
    }
}