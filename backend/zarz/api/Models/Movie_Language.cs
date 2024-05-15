using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Movie_Language
    {
        public int Language_id { get; set; }
        public Language Language{get;set;}
        public int Movie_id { get; set; }
        public Movie Movie{get;set;}
    }
}