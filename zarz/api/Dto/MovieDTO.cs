using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Dto
{
    public class MoviesDTO
    {
        [Key]
        public int Movie_id { get; set; }
        public string? Title { get; set; }
        public DateTime? Release_date { get; set; }
        public string? Description { get; set; }
        public string? Avatar { get; set; }
        public ICollection<Genres_MoviesDTO> GenresMovies { get; set; } = new List<Genres_MoviesDTO>();
        public ICollection<Directors_MoviesDTO> DirectorsMovies { get; set; }= new List<Directors_MoviesDTO>();
        public ICollection<Movie_Production_CompaniesDTO> MovieProductionCompanies { get; set; }= new List<Movie_Production_CompaniesDTO>();
        public ICollection<Movie_Movie_CatalogDTO> MovieMovieCatalogsDTO { get; set; }= new List<Movie_Movie_CatalogDTO>();
        public ICollection<Actors_MoviesDTO> Actors_Movies { get; set; }= new List<Actors_MoviesDTO>();
    }
}