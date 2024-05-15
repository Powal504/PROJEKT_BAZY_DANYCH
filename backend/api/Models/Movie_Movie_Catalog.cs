using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Movie_Movie_Catalog
    {
        public int Movie_catalog_id { get; set; }
        public int Movie_id { get; set; }
        public Movies Movie{get;set;}
    }
}