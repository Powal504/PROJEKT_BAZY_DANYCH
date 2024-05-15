using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Actors_Movies
    {
        public int Actor_id { get; set; }
        public int Movie_id { get; set; }
        public Movies Movie{get;set;}
        public Actors Actor{get;set;}
        public string? Role_of_actor_in_film { get; set; }
    }
}