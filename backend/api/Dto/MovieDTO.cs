using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
<<<<<<< HEAD:zarz/api/Dto/MovieDTO.cs
=======
using api.Models;
>>>>>>> back:backend/api/Dto/MovieDTO.cs

namespace api.Dto
{
    public class MoviesDTO
    {
        [Key]
        public int Movie_id { get; set; }
        public string? Title { get; set; } 
        public DateTime? Release_date { get; set; }
        public string? Descritpion { get; set; }
        public string? Avatar { get; set; }
       // public ICollection<Genres_MoviesDTO> GenresMovies { get; set; } = new List<Genres_MoviesDTO>();


    }
}