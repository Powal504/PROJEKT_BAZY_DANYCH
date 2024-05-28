using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Directors_Movies
    {
        public int Director_id { get; set; }
        [ForeignKey("Director_id")]
        public Directors Director{get;set;}
        public int Movie_id { get; set; }
        [ForeignKey("Movie_id")]
        public Movies Movie {get;set;}
    }
}