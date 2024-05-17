using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace api.Models
{
    public class Movie_Production_Companies
    {
        public int Company_id { get; set; }
        [ForeignKey("Company_id")]
        public Production_Companies Company{get;set;}
        public int Movie_id { get; set; }
        [ForeignKey("Movie_id")]
        public Movies Movie{get;set;}

    }
}