using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Genres_Movies
    {
        public int Genre_id { get; set; }
        public Genres Genre{get;set;}
        public int Movie_id { get; set; }
        public Movies Movie{get;set;}
    }
}