using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Movie_Actor
    {
        public int Actor_id { get; set; }
        public int Movie_id { get; set; }
        public Movie Movie{get;set;}
        public Actor Actor{get;set;}
    }
}