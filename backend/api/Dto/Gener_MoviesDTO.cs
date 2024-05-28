using System;
using System.Collections.Generic;
<<<<<<< HEAD:zarz/api/Dto/Gener_MoviesDTO.cs
=======
using System.ComponentModel.DataAnnotations.Schema;
>>>>>>> back:backend/api/Dto/Gener_MoviesDTO.cs
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Dto
{
    public class Genres_MoviesDTO
    {
        public int Genre_id { get; set; }
<<<<<<< HEAD:zarz/api/Dto/Gener_MoviesDTO.cs
        public Genres Genre{get;set;}
        public int Movie_id { get; set; }
=======
        [ForeignKey("Genre_id")]
        public Genres Genre{get;set;}
        public int Movie_id { get; set; }
        [ForeignKey("Movie_id")]
>>>>>>> back:backend/api/Dto/Gener_MoviesDTO.cs
        public Movies Movie{get;set;}
    }
}