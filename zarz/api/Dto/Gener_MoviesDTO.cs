using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using api.Models;

namespace api.Dto
{
    public class Genres_MoviesDTO
    {
        public int Genre_id { get; set; }

        public int Movie_id { get; set; }
        
    }
}