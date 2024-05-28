using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Actors_Movies
    {
        public int Actor_id { get; set; }
        public int Movie_id { get; set; }
        [ForeignKey("Movie_id")]
        public Movies Movie{get;set;}
        [ForeignKey("Actor_id")]
        public Actors Actor{get;set;}
        public string? Role_of_actor_in_film { get; set; }
    }
}