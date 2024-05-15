using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Directors_Movies
    {
        public int Director_id { get; set; }
        public Directors Director{get;set;}
        public int Movie_id { get; set; }
        public Movies Movie {get;set;}
    }
}