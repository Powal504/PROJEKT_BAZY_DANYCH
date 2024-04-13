using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Movie
    {
        public int Movie_id { get; set; }
        public int Genre_id { get; set; }
        public Genre Genre{get;set;}
        public int Director_id { get; set; }
        public Director Director{get;set;}
        public string Title { get; set; }
        public DateTime Release_date { get; set; }

    }
}