using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Rating
    {
        public int Movie_id { get; set; }
        public Movie Movie{get;set;}
        public int User_id { get; set; }
        public User User{get;set;}
        public int Rating_id { get; set; }
        public float Rating_value { get; set; }


    }
}