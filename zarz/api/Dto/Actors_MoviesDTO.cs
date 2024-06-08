using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Dto
{
    public class Actors_MoviesDTO
    {
        public int Actor_id { get; set; }
        public int Movie_id { get; set; }
        public string? Role_of_actor_in_film { get; set; }
        
    }
}