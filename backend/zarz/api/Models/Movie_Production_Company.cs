using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace api.Models
{
    public class Movie_Production_Company
    {
        public int Company_id { get; set; }
        public Production_Company Company{get;set;}
        public int Movie_id { get; set; }
        public Movie Movie{get;set;}

    }
}