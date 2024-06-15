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
        public string? Avatar { get; set; }// na byte trzeba zmienic
        public ICollection<Genres_Movies> GenresMovies { get; set; } = new List<Genres_Movies>(); 
        public ICollection<Directors_Movies> DirectorsMovies { get; set; }= new List<Directors_Movies>();
        public ICollection<Movie_Production_Companies> MovieProductionCompanies { get; set; }= new List<Movie_Production_Companies>();
        public ICollection<Movie_Movie_Catalog> MovieMovieCatalogs { get; set; }= new List<Movie_Movie_Catalog>();
        public ICollection<Actors_Movies> Actors_Movies { get; set; }= new List<Actors_Movies>();
    }
}