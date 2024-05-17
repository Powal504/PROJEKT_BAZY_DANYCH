using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Genres_Movies
    {
        public int Genre_id { get; set; }
        [ForeignKey("Genre_id")]
        public Genres Genre{get;set;}
        public int Movie_id { get; set; }
        [ForeignKey("Movie_id")]
        public Movies Movie{get;set;}
    }
}